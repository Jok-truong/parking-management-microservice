import { AuthLayout } from '@parking-management-microservice/ui/src/components/molecules/AuthLayout'
import { RegisterForm } from '@parking-management-microservice/ui/src/components/templates/RegisterForm'

export default function Page() {
  return (
    <AuthLayout title={'Register'}>
      <RegisterForm />
    </AuthLayout>
  )
}
