import { Field, ID, ObjectType } from '@nestjs/graphql'
import { AuthUser } from 'src/graphql.schema.generated'


@ObjectType()
export class PostModel {
  @Field((type) => ID)
  post_id: number

  @Field()
  post_title: string

  @Field((type) => String, { nullable: true })
  post_body: string | null

  @Field((type) => AuthUser, { nullable: true })
  auth_user?: AuthUser | null
}




