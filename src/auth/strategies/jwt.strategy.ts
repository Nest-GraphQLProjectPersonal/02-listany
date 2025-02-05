import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){

    constructor(
        private readonly authService: AuthService,

        ConfigService: ConfigService //se agrega para poder obtener el JWT_SECRET 
    ) {
        super({
            secretOrKey: ConfigService.get('JWT_SECRET'),//se obtiene el JWT_SECRET de las variables de entorno
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()//se obtiene el token del header
        })
    }

    async validate( payload: JwtPayload ): Promise<User> { // se valida el token y se obtiene el usuario 
        
        const { id } = payload; //se obtiene el id del payload

        const user = await this.authService.validateUser( id ); //se valida el usuario por el id

        return user;
        
    }
}