import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000).then(() => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
  });
  } catch (error) {
    console.error('Error starting the application:', error);
  }
}
bootstrap();
