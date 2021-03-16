import { IsEmail, MinLength, IsInt } from 'class-validator';
import { SignUpInput } from '../../../graphql.schema.generated';

export class SignUpInputDto extends SignUpInput {
  @IsEmail()
  readonly user_email: string;

  @MinLength(6)
  readonly user_password: string;

}