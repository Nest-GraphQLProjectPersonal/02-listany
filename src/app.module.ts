import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'aavel',
      password: process.env.DB_PASSWORD || 'tu_contraseña_correcta',
      database: process.env.DB_NAME || 'mydatabase',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
