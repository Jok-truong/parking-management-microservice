'use client'
import { useQuery } from '@apollo/client'
import { UsersDocument } from '@parking-management-microservice/network/src/gql/generated'
import { add } from '@parking-management-microservice/sample-lib'
import { Button } from '@parking-management-microservice/ui/src/components/atoms/Button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data } = useQuery(UsersDocument)

  const { data: sessionData } = useSession()

  return (
    <main className="bg-primary">
      <>
        {sessionData?.user?.uid ? (
          <Button onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <Link href={'/login'}>Login</Link>
        )}
      </>
      Hello {add(1, 2)}
      <>
        {data?.users.map((user) => (
          <div className="p-4 rounded" key={user.uid}>
            <div>{user.uid}</div>
            <div>{user.name}</div>
          </div>
        ))}
      </>
    </main>
  )
}
