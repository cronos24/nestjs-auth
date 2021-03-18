import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MicroservicesModel {
  @Field((type) => ID)
  id: number

  @Field()
  name: string

  @Field()
  hostname: string

  @Field()
  port: number


  @Field()
  state: number

}
