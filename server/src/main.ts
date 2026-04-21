import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/'); // NOTE: Used to set global api access URI
  app.useGlobalPipes(new ValidationPipe()); // NOTE: used to enable class-validation
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(process.env.PORT ?? 3002);
}
void bootstrap();
