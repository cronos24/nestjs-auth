import { AuthUser } from '@prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInputDto } from './dto/sign-up-input.dto';
import { UserToken } from './models/user-token';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

    async validate(id: number): Promise<AuthUser> {
        const user = await this.prisma.authUser.findUnique({ 
            where: {
                user_id: id,
              },
         });
        if (!user) {
        throw Error('Authenticate validation error');
        }
        return user;
    }

    async token(token: any) {
      
      return 'ok';
    }

    public async login(input: SignUpInputDto, res): Promise<UserToken> {

        const found = await this.prisma.authUser.findUnique({ 
            where: {
                user_email: input.user_email,
              },
         });
         
    
        if (!found) {
          throw new NotFoundException('Email or password incorrect');
        }
    
        const passwordValid = await bcryptjs.compare(input.user_password, found.user_password);
    
        if (!passwordValid) {
            throw new NotFoundException('Email or password incorrect');
        }

        const jwt = this.jwt.sign({ id: found.user_id });
        res.cookie('token', jwt, { httpOnly: true });
    
        return { user: found, token: jwt }
      }

    public async register(input: SignUpInputDto, res): Promise<UserToken> {

    const found = await this.prisma.authUser.findUnique({ 
        where: {
            user_email: input.user_email,
          },
     });

    if (found) {
      throw new BadRequestException(`Cannot register with email ${input.user_email}`)
    }

    const password = await bcryptjs.hash(input.user_password, 10);


    const created =  await  this.prisma.authUser.create({
        data: {
          user_email: input.user_email,
          user_password: password
        },
      })

      const jwt = this.jwt.sign({ id: created.user_id });
      res.cookie('token', jwt, { httpOnly: true });
  
      return { user: created, token: jwt }  
     
     }

    
}
