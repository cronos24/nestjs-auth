import { Field, ObjectType } from '@nestjs/graphql'
import { AuthUser } from '@prisma/client';

@ObjectType()
export class UserToken {
  @Field()
  token: string

  @Field()
  //user: aut_user
  user: AuthUser
}