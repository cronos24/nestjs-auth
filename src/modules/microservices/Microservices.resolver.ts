import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/security/guards/graphql-auth.guard';
import { RolesGuard } from 'src/security/guards/roles.guard';
import { MicroservicesInput, MicroservicesSend } from '../../graphql.schema.generated';
import { MicroservicesModel } from './models/Microservices-model';
import { MicroservicesService } from './Microservices.service';


@Resolver('Microservices')
export class MicroservicesResolver {
  constructor(
    private readonly service: MicroservicesService
  ) {}


  @Mutation(()=>MicroservicesModel)
  @UseGuards(GqlAuthGuard)  
  createMicroservice(@Args({ name: 'input', type: () => MicroservicesInput}) input: MicroservicesInput, @Context() ctx) {
    return  this.service.create(input, ctx)  
  }

  @Mutation()
  //@UseGuards(GqlAuthGuard)  
  useMicroservice(@Args({ name: 'input', type: () => MicroservicesSend}) input: MicroservicesSend, @Context() ctx) {
    return  this.service.use(input, ctx)  
  }

  
}