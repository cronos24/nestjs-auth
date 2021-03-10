import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';




@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  

  async canActivate(context: ExecutionContext): Promise<any> {

    const request = GqlExecutionContext.create(context).getContext().req;
    
    let user_id= request.user.id;
    let _class = context.getClass().name;
    let mutation = context.getHandler().name;
    const final_route=  _class+'/'+mutation;

    let roles=  await this.getRolesByUser(user_id);
    var _authorization= false;
    var cont= 0;

    if (!roles) {
        return false;
    }

        for (var roll of roles) {
        cont ++;
        var rutasbyroll= await this.getRutasByRoll(roll.rolId, final_route);

        if (rutasbyroll.length > 0) {
            _authorization= true;
                break;  
        }        
        
        // for (const _rutas of rutasbyroll) {
        //     if (_rutas.rutas.ruta === final_route) {
        //         _authorization= true;
        //         break;               
        //     }
        //   }

        // if (_authorization==true) {
        //     break;
        // }
          
    }    

    
    return _authorization;   
 

  }

    async getRolesByUser(id: any): Promise<any> {
        const roles= await this.prisma.user_roles.findMany({ 
            where: {
                userId: id,
                state: 1
            },
        });       
        
        return roles;    

    }


    async getRutasByRoll(id: number, final_route: any): Promise<any> {
        const rutas= await this.prisma.rutas_roles.findMany({ 
            where: {
                rolId: id,
                state: 1,
                rutas: {
                  ruta: final_route,
                },
              },
              select: {
                rutas: {                  
                  select: {
                    ruta: true,
                  },
                },
              },        
        });

                       
         return rutas;    
    
    }

    
}