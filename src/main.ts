import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //Crea una instancia de la aplicación NestJS llamando a NestFactory.create() 
  //y pasando el módulo principal de la aplicación AppModule.y esta instancia se almacena en la variable app
  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes( // esto es para la configuracion de validacion global
    new ValidationPipe({
      whitelist: true, //esto permite las clases decoradoras en las clases dto pasen a la instancia controladora
      forbidNonWhitelisted: true, //si intenta enviar una propiedad no permitida, se generará un error.
      transform: true, //esto habilita la transformacion automatica
    })
  );
  await app.listen(3000); //inicia el puerto
}
bootstrap();
