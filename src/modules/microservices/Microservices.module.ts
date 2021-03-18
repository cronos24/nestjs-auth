import { HttpModule, Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MicroservicesResolver } from './Microservices.resolver';
import { MicroservicesService } from './Microservices.service';


@Module({
  providers: [MicroservicesResolver,MicroservicesService],
  imports: [PrismaModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    })],
})
export class MicroservicesModule {}
