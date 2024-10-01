import { add } from '@parking-management-microservice/sample-lib'

export default function Home() {
  return <main className="text-red-500">Hello {add(1, 2)}</main>
}
