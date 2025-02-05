import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';

import { validRolesArgs } from './dto/args/roles.args';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ValidRoles } from '../auth/enums/valid-roles.enum';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [User], { name: 'usersFindAll' })
  findAll(
    @CurrentUser([ValidRoles.admin]) user: User,
    @Args() ValidRoles: validRolesArgs
  ): Promise<User[]> {
    return this.usersService.findAll(ValidRoles.roles);
  }

  @Query(() => User, { name: 'userById' })
  findOne(
    @CurrentUser([ValidRoles.admin]) user: User,
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
  ): Promise<User> {
    
    return this.usersService.findOneById(id);
  }
  
  @Mutation(() => User, { name: 'userUpdate' })
  updateUser(
    @CurrentUser([ValidRoles.admin]) user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput, user);//el user es el usuario que esta haciendo la peticion
  }

  @Mutation(() => User, { name: 'blockUser' })
  blockUser(
    @CurrentUser([ValidRoles.admin]) user: User,
    @Args('id', { type: () => ID }) id: string
  ): Promise<User> {
    return this.usersService.block(id, user);
  }
}
