import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import GraphQLJSON from 'graphql-type-json';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      context: ({ req, res }) => ({ req, res }),
      typePaths: ['./src/*/*.graphql'], // path for gql schema files
      resolvers: { JSON: GraphQLJSON },
      installSubscriptionHandlers: true,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      definitions: { // will generate .ts types from gql schema files
        path: join(process.cwd(), 'src/graphql.schema.generated.ts'),
        outputAs: 'class',
      },
      debug: true,
      introspection: true,
      playground: true,
      cors: false,
    };
  }
}