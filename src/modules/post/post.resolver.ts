import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/graphql-auth.guard';
import { PostInput } from '../../graphql.schema.generated';
import { PostModel } from './models/post-model';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(
    private readonly service: PostService
  ) {}


  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard)
  createPost(@Args({ name: 'input', type: () => PostInput}) input: PostInput, @Context() ctx) {
    return  this.service.create(input, ctx)  
  }


 


  
}