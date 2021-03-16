import { Response } from 'express';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput, SignUpInput } from '../../graphql.schema.generated';
import { AuthService } from './auth.service'
import { UserToken } from './models/user-token';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly service: AuthService
  ) {}



  @Mutation(() => UserToken)
  login(@Args({ name: 'input', type: () => LoginInput }) input: LoginInput, @Context('res') res: Response) {
    console.log('input', input);
    
    return  this.service.login(input, res)  
  }

  // @Mutation()
  // profile(@Args({ name: 'input', type: () => LoginInput }) input: LoginInput, @Context('res') res: Response) {
  //   return  this.service.login(input, res)  
  // }


  @Mutation(() => UserToken)
  signup(@Args({ name: 'input', type: () => SignUpInput }) input: SignUpInput, @Context('res') res: Response) {
    console.log('input', input);
    return this.service.register(input, res)
  }

  


  
}