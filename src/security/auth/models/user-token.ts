import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@prisma/client';

@ObjectType()
export class UserToken {
  @Field()
  token: string

  @Field()
  user: User
}