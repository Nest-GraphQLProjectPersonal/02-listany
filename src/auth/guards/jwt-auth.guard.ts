import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') { //se extiende de AuthGuard y se le pasa el nombre de la estrategia jwt

    //! Override
    getRequest( context: ExecutionContext ) { //se obtiene el request del contexto 

        const ctx = GqlExecutionContext.create( context ); //se crea el contexto de graphql
        const request = ctx.getContext().req;//se obtiene el request del contexto

        return request; 

    }

}