import configuration from '@app/config';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModule } from './module/redis/redis.module';
import { RedisClientOptions } from '@liaoliaots/nestjs-redis';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './module/system/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/auth.guards';
import { UserModule } from './module/system/user/user.module';
import { MainModule } from './module/main/main.module';
import { AxiosModule } from './module/axios/axios.module';
import { PostModule } from './module/system/post/post.module';
import { RoleModule } from './module/system/role/role.module';

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
    UserModule,
    MainModule,
    AxiosModule,
    PostModule,
    RoleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
