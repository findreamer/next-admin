import { Global, Module } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [],
  controllers: [ConfigController],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class SysConfigModule {}
