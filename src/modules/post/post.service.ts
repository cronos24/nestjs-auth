import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostInputDto } from './dto/post-input.dto';
import { PostModel } from './models/post-model';


@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}

 
    public async create(input: PostInputDto, ctx): Promise<PostModel> {

        return this.prisma.geTpost.create({
            data: {
                post_title: input.post_title,
                post_body: input.post_body,
                user_id: input.user_id                
            },
          })
    
    }

    


    
}
