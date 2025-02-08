import { forwardRef, Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from 'src/items/items.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports:[ 
    forwardRef(()=>
    
      ConfigModule,
    ),
    forwardRef(()=>
    
      UsersModule,
    ),
    forwardRef(()=>
      ItemsModule
    )
  ]

})
export class SeedModule {}
