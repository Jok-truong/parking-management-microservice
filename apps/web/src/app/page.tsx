'use client'
import { useQuery } from '@apollo/client'
import { UsersDocument } from '@parking-management-microservice/network/src/gql/generated'
import { BrandIcon } from '@parking-management-microservice/ui/src/components/atoms/BrandIcon'
import { Button } from '@parking-management-microservice/ui/src/components/atoms/Button'

export default function Home() {
  const { data } = useQuery(UsersDocument)
  console.log(data, 'data')

  return (
    <main className="bg-primary">
      <BrandIcon />
      <Button>Hello</Button>
      <div></div>
    </main>
  )
}
