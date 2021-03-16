import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';
import { PostInput } from '../../../graphql.schema.generated';

export class PostInputDto extends PostInput {
  @IsString()
  @MinLength(10)
  @MaxLength(60)
  readonly post_title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(255)
  readonly post_body: string;

  @IsInt()
  readonly user_id: any;
}