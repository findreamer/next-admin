import {
  RedisModule as LiaoliaoRedisModule,
  RedisModuleAsyncOptions,
} from '@liaoliaots/nestjs-redis';
import { Module, Global, DynamicModule } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static forRoot(
    options: RedisModuleAsyncOptions,
    isGlobal = true,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [LiaoliaoRedisModule.forRootAsync(options, isGlobal)],
      providers: [RedisService],
      exports: [RedisModule],
    };
  }

  static forRootAsync(
    options: RedisModuleAsyncOptions,
    isGlobal = true,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [LiaoliaoRedisModule.forRootAsync(options, isGlobal)],
      providers: [RedisService],
      exports: [RedisService],
    };
  }
}
