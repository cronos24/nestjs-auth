import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from '../graphql.schema.generated';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpInputDto } from './sign-up-input.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation()
  async login(
    @Args('loginInput') { email, password }: LoginInput,
    @Context('res') res: Response,
  ) {
    //const user = await this.prisma.client.user({ email });
    const user = await this.prisma.user.findUnique({ 
        where: {
            email: email,
          },
     });

    if (!user) {
      throw Error('Email or password incorrect');
    }

     const valid = await bcryptjs.compare(password, user.password);


     
    if (!valid) {
      throw Error('Email or password incorrect');
    }

    const jwt = this.jwt.sign({ id: user.id });
    res.cookie('token', jwt, { httpOnly: true });

    return user;
  }

  @Mutation()
  async signup(
    @Args('signUpInput') signUpInputDto: SignUpInputDto,
    @Context('res') res: Response,
  ) {
    // const emailExists = await this.prisma.client.$exists.user({
    //   email: signUpInputDto.email,
    // });

    const emailExists = await this.prisma.user.findUnique({ 
        where: {
            email: signUpInputDto.email,
          },
     });
     
    if (emailExists) {
      throw Error('Email is already in use');
    }
    const password = await bcryptjs.hash(signUpInputDto.password, 10);


    const user = await  this.prisma.user.create({
        data: {
            ...signUpInputDto, password
        },
      })

    const jwt = this.jwt.sign({ id: user.id });
    res.cookie('token', jwt, { httpOnly: true });

    return user;
  }
}