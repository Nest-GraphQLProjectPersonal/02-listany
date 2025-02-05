


import { registerEnumType } from "@nestjs/graphql";

export enum ValidRoles {

    admin     = 'admin',
    user      = 'user',
    superUser = 'superUser'
}

registerEnumType(ValidRoles, {  name: 'ValidRoles' });// con esto se registra el enum como un tipo de dato de GraphQL