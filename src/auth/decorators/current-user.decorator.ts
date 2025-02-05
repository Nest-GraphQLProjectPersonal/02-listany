import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums/valid-roles.enum';
import { User } from '../../users/entities/user.entity';

export const CurrentUser = createParamDecorator( 
    ( roles: ValidRoles[] = [], context: ExecutionContext ) => {

        const ctx = GqlExecutionContext.create( context )//crea un contexto de graphql
        const user: User = ctx.getContext().req.user;//obtiene el usuario del contexto 

        if ( !user ) {
            throw new InternalServerErrorException(`No user inside the request - make sure that we used the AuthGuard`)
        }

        if ( roles.length === 0 ) return user;

        for ( const role of user.roles ) { //recorre los roles del usuario
            //TODO: Eliminar Valid Roles
            if ( roles.includes( role as ValidRoles ) ) { //verifica si el rol del usuario esta en los roles permitidos
                return user;
            }
        }

        throw new ForbiddenException( // esta autenticado pero no tiene la autorizacion 
            `User ${ user.fullName } need a valid role [${ roles }]`
        )

})