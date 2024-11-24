'use client'

import { useFormRegister } from '@parking-management-microservice/forms/src/register'
import { RegisterWithCredentialsDocument } from '@parking-management-microservice/network/src/gql/generated'
import { Role } from '@parking-management-microservice/utils/types'

import { Button } from '../atoms/Button'
import { Form } from '../atoms/Form'
import { HtmlInput } from '../atoms/HtmlInput'
import { HtmlLabel } from '../atoms/HtmlLabel'

import { useMutation } from '@apollo/client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export interface IRegisterFormProps {
  className?: string
  role?: Role
}
export const RegisterForm = ({ className }: IRegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  const [registerWithCredentials, { loading }] = useMutation(
    RegisterWithCredentialsDocument,
  )

  const onSubmit = handleSubmit(async (formData) => {
    const { data, errors } = await registerWithCredentials({
      variables: {
        registerWithCredentialsInput: formData,
      },
    })

    if (errors) {
      alert(errors)
    }

    if (data) {
      alert(`User ${data.registerWithCredentials.uid} created. 🎉`)
      signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl: '/',
      })
    }
  })

  return (
    <Form onSubmit={onSubmit} className={className}>
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput className="text-black" type="email" {...register('email')} />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          className="text-black"
          type="password"
          placeholder="Enter your password."
          {...register('password')}
        />
      </HtmlLabel>
      <HtmlLabel title="Display name" error={errors.name?.message}>
        <HtmlInput
          className="text-black"
          placeholder="Enter your name."
          {...register('name')}
        />
      </HtmlLabel>
      {Object.keys(errors).length ? (
        <div className="text-xs text-gray-600">
          Please fix the above {Object.keys(errors).length} errors
        </div>
      ) : null}
      <Button type="submit" fullWidth loading={loading}>
        Register
      </Button>
      <div className="mt-4 text-sm ">
        Already have an account?
        <br />
        <Link href="/login" className="font-bold underline underline-offset-4">
          Login
        </Link>{' '}
        now.
      </div>
    </Form>
  )
}
