import { authOptions } from '@parking-management-microservice/network/src/config/authOptions'
import NextAuth from 'next-auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
