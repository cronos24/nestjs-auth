import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from 'src/graphql.schema.generated'


@ObjectType()
export class PostModel {
  @Field((type) => ID)
  id: number

  @Field()
  title: string

  @Field((type) => String, { nullable: true })
  body: string | null

  @Field((type) => User, { nullable: true })
  author?: User | null
}