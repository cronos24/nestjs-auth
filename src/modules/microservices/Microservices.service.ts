
import { BadRequestException, HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { MicroservicesSend } from 'src/graphql.schema.generated';
import { PrismaService } from 'src/prisma/prisma.service';
import { MicroservicesInputDto } from './dto/microservices.dto';
import { MicroservicesModel } from './models/microservices-model';
import fetcher from 'isomorphic-fetch';
import { ApolloClient, gql, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
const fetch = require("node-fetch");


@Injectable()
export class MicroservicesService {
    constructor(private readonly prisma: PrismaService, private httpService: HttpService) {}

 
    public async create(input: MicroservicesInputDto, ctx): Promise<MicroservicesModel> {

        const found = await this.prisma.microservices.findUnique({ 
            where: {
                name: input.name,
              },
         });
    
        if (found) {
          throw new BadRequestException(`Cannot register with name ${input.name}`)
        }
        

        const created = await this.prisma.microservices.create({
            data:{
                name: input.name,
                hostname: input.hostname,
                port: input.port,
                state: input.state,
            }
        });


        return created;


    
    }


    public async use(input: MicroservicesSend, ctx): Promise<any> {

        const found = await this.prisma.microservices.findUnique({ 
            where: {
                name: input.name,
              },
         });

    
        if (!found) {
          throw new BadRequestException(`No se encuentra microservicio con el nombre ${input.name}`)
        }

        let url= found.hostname+':'+found.port+'/graphql' 
        let payload= input.query;

        //let payload = `{'query':{'products':{'id':true,'product':true}}}`;

        
        const temp = JSON.parse(payload.replace(/[']+/g, '"'));
        const graphql_query = jsonToGraphQLQuery(temp, { pretty: true });

   
        const httpLink = createHttpLink({
            uri: "http://"+url,
            fetch: fetch
          });

        const client = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache()
          });  

        const QUERY = gql`
            ${graphql_query}
            `;


          let status= 'success';
          let responseql= {}; 

         try {
            const result = await client.query({
                query:QUERY,
             });
           
             responseql= result.data

          } catch (err) {
            status= 'fail';
            responseql= (JSON.stringify(err));
          }


     
         return { status: status, response: responseql }
  

        
    
    }

    


    
}
