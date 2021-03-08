import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlOptions } from './graphql.options';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './security/auth/auth.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { PostModule } from './modules/post/post.module';
import { RolesGuard } from './security/guards/roles.guard';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
    PrismaModule,
    AuthModule,
    PostModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    
  ],
})
export class AppModule {}
