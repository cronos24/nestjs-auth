import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostInputDto } from './dto/post-input.dto';
import { PostModel } from './models/post-model';


@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}

 
    public async create(input: PostInputDto, ctx): Promise<PostModel> {

        return this.prisma.post.create({
            data: {
              title: input.title,
              body: input.body,
              author: {
                connect: { email: input.authorEmail },
              },
            },
          })
    
    }

    


    
}
