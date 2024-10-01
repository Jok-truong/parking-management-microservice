import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  uid: string
}
