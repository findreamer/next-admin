import configuration from '@app/config';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModule } from './module/redis/redis.module';
import { RedisClientOptions } from '@liaoliaots/nestjs-redis';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './module/system/auth/auth.module';

@Module({
  imports: [
    // 获取环境配置
    ConfigModule.forRoot({
      cache: true,
      // 自定义加载环境配置函数
      load: [configuration],
      isGlobal: true,
    }),

    // 配置数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          autoLoadEntities: true,
          keepConnectionAlive: true,
          ...config.get('db.mysql'),
        } as TypeOrmModuleOptions;
      },
    }),

    // 配置redis

    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          closeClient: true,
          readyLog: true,
          errorLog: true,
          config: config.get<RedisClientOptions>('redis'),
        };
      },
    }),
    HttpModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
