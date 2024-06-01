import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  // 获取 api 访问前缀
  const prefix = config.get('app.prefix');
  app.setGlobalPrefix(prefix);

  await app.listen(3000);
}
bootstrap();
