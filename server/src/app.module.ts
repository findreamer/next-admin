import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import configuration from '@app/config';

@Module({
  imports: [
    // 获取环境配置
    ConfigModule.forRoot({
      cache: true,
      // 自定义加载环境配置函数
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
