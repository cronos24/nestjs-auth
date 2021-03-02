import { Response } from 'express';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from '../graphql.schema.generated';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service'
import { UserToken } from './models/user-token';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly service: AuthService
  ) {}



  @Mutation(() => UserToken)
  login(@Args({ name: 'input', type: () => LoginInput }) input: LoginInput, @Context('res') res: Response) {
    return  this.service.login(input, res)  
  }


  @Mutation(() => UserToken)
  signup(@Args({ name: 'input', type: () => LoginInput }) input: LoginInput, @Context('res') res: Response) {
    return this.service.register(input, res)
  }

  


  
}