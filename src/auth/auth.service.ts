import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInputDto } from './dto/sign-up-input.dto';
import { UserToken } from './models/user-token';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

    async validate(id: any): Promise<User> {
        const user = await this.prisma.user.findUnique({ 
            where: {
                id: id,
              },
         });
        if (!user) {
        throw Error('Authenticate validation error');
        }
        return user;
    }

    public async login(input: SignUpInputDto, res): Promise<UserToken> {


        const found = await this.prisma.user.findUnique({ 
            where: {
                email: input.email,
              },
         });
         
    
        if (!found) {
          //throw new NotFoundException('Email or password incorrect')
          throw Error('Email or password incorrect');
        }
    
        const passwordValid = await bcryptjs.compare(input.password, found.password);
        //const passwordValid = await AuthHelper.validate(input.password, found.password)
    
        if (!passwordValid) {
            throw Error('Email or password incorrect');
        }

        const jwt = this.jwt.sign({ id: found.id });
        res.cookie('token', jwt, { httpOnly: true });
    
        return { user: found, token: jwt }
      }

    public async register(input: SignUpInputDto, res): Promise<UserToken> {
    // Make sure that we have user with that email already
    const found = await this.prisma.user.findUnique({ 
        where: {
            email: input.email,
          },
     });

    if (found) {
      throw new BadRequestException(`Cannot register with email ${input.email}`)
    }

    const password = await bcryptjs.hash(input.password, 10);


    const created =  await  this.prisma.user.create({
        data: {
            ...input, password
        },
      })

      const jwt = this.jwt.sign({ id: created.id });
      res.cookie('token', jwt, { httpOnly: true });
  
      return { user: created, token: jwt }  
     
  }

    
}
