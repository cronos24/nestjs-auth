import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

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
}
