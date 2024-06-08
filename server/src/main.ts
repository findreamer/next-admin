import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { mw as requestIpMw } from 'request-ip';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  // 设置访问频率
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 1000, // 限制15分钟内最多只能访问1000次
    }),
  );

  // 获取 api 访问前缀
  const prefix = config.get('app.prefix');
  app.setGlobalPrefix(prefix);

  // web 安全，防常见漏洞
  // 注意： 开发环境如果开启 nest static module 需要将 crossOriginResourcePolicy 设置为 false 否则 静态资源 跨域不可访问
  app.use(
    helmet({
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
      crossOriginResourcePolicy: false,
    }),
  );

  // 配置swragger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Next-admin')
    .setDescription('Next admin 文档接口')
    .setVersion('2.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  // 项目依赖当前文档功能，最好不要改变当前地址
  // 生产环境使用 nginx 可以将当前文档地址 屏蔽外部访问
  SwaggerModule.setup(`${prefix}/swagger-ui`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Next-Admin API Docs',
  });

  // 获取真实IP
  app.use(requestIpMw({ attributeName: 'ip' }));

  //服务端口
  const port = config.get<number>('app.port') || 8080;
  await app.listen(port);

  console.log(
    `Next-Admin 服务启动成功 `,
    '\n',
    '服务地址:',
    `http://localhost:${port}${prefix}/`,
    '\n',
    'swagger 文档地址 :',
    `http://localhost:${port}${prefix}/swagger-ui/`,
  );
}
bootstrap();
