import { AuthLayout } from '@parking-management-microservice/ui/src/components/molecules/AuthLayout'
import { LoginForm } from '@parking-management-microservice/ui/src/components/templates/LoginForm'
export default function Login() {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  )
}
