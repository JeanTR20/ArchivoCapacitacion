import { Module, Controller } from '@nestjs/common';
//import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({ //entrada principa y se utiliza para configurar la estructura general
  imports: [
    
    CatsModule,
    TypeOrmModule.forRoot({ //módulo para la integración de TypeORM
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BreedsModule,
    UsersModule, //modulos creados user
    AuthModule,//modulo creado autenticacion
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} //esto pueda ser utilizada en otros archivos de tu proyecto 
