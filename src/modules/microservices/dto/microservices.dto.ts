import { IsInt, IsString } from 'class-validator';
import { MicroservicesInput } from '../../../graphql.schema.generated';

export class MicroservicesInputDto extends MicroservicesInput {
  @IsString()
  readonly name: string;

  @IsString()
  readonly hostname: string;

  @IsInt()
  readonly port: number;

  @IsInt()
  readonly state: number;
}
