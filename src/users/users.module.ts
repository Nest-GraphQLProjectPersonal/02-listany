import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { ItemsModule } from 'src/items/items.module';

@Module({
  providers: [
    UsersResolver, 
    UsersService
  ],
  imports: [
    forwardRef(()=>ItemsModule),
    TypeOrmModule.forFeature([ User ])
  ],
  exports: [
    TypeOrmModule,
    UsersService
  ]
})
export class UsersModule {}
