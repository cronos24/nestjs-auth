import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PrismaModule } from '../../prisma/prisma.module';
import { PostService } from './post.service';

@Module({
  providers: [PostResolver, PostService],
  imports: [PrismaModule],
})
export class PostModule {}
