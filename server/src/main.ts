import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { PORT = 3838 } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
