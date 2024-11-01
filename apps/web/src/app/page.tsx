'use client'
import { useQuery } from '@apollo/client'
import { UsersDocument } from '@parking-management-microservice/network/src/gql/generated'

export default function Home() {
  const { data } = useQuery(UsersDocument)
  console.log(data, 'data')

  return <main className="text-red-500">Hello </main>
}
