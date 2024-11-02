import * as jwt from 'jsonwebtoken'
import { getServerSession, NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { fetchGraphQL } from '../fetch'
import {
  AuthProviderType,
  GetAuthProviderDocument,
  LoginDocument,
  RegisterWithProviderDocument,
} from '../gql/generated'

const MAX_AGE = 1 * 24 * 60 * 60

export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth provider configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error('Email and password are required')
        }
        const { email, password } = credentials
        console.log({ email, password })

        try {
          const { data, error } = await fetchGraphQL({
            document: LoginDocument,
            variables: {
              loginInput: {
                email,
                password,
              },
            },
          })
          console.log({ data, error })
          if (!data?.login.token || error) {
            throw new Error(
              'Authcation failed. Please check your credentials and try again.',
            )
          }

          const { uid, image, name } = data.login.user

          return {
            id: uid,
            name,
            email,
            image,
          }
        } catch (error) {}
        return null
      },
    }),
  ],

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',

  // configure session settings
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },

  // configure JWT settings
  jwt: {
    maxAge: MAX_AGE,
    // Custom JWT decoding function
    async encode({ token, secret }): Promise<string> {
      if (!token) {
        throw new Error('Token is undefined')
      }

      const { sub, ...tokenProps } = token
      // Get the current data in seconds since the epoch
      const nowInSeconds = Math.floor(Date.now() / 1000)

      // Calculate the expiration timestamp
      const expirationInSeconds = nowInSeconds + MAX_AGE

      return jwt.sign(
        {
          uid: sub,
          ...tokenProps,
          exp: expirationInSeconds,
        },
        secret,
        {
          algorithm: 'HS256',
        },
      )
    },

    async decode({ token, secret }): Promise<JWT | null> {
      {
        // Implement custom JWT decoding logic
        if (!token) throw new Error('Token is undefined')

        try {
          const decodedToken = jwt.verify(token, secret, {
            algorithms: ['HS256'],
          })
          return decodedToken as JWT
        } catch (error) {
          console.log('error: ', error)
          return null
        }
      }
    },
  },
  // Configure callback functions
  callbacks: {
    // Sign-in callback
    async signIn({ user, account }) {
      // Implement custom sign-in logic

      if (account?.provider === 'google') {
        const { id, email, image, name } = user

        const existingUser = await fetchGraphQL({
          document: GetAuthProviderDocument,
          variables: {
            uid: id,
          },
        })

        if (!existingUser.data?.getAuthProvider?.uid) {
          const newUser = await fetchGraphQL({
            document: RegisterWithProviderDocument,
            variables: {
              registerWithProviderInput: {
                uid: id,
                type: AuthProviderType.Google,
                image,
                name: name || '',
              },
            },
          })
        }
      }
      return true
    },
    async session({ token, session }) {
      // Customize session object based on token data
      if (token) {
        session.user = {
          image: token.picture,
          uid: (token.uid as string) || '',
          email: token.email,
          name: token.name,
        }
      }
      return session
    },
  },

  // Configure pages to redirect to
  pages: {
    signIn: '/signIn',
  },
}

export const getAuth = () => getServerSession(authOptions)
