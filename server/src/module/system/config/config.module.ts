import { Global, Module } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysConfigEntity } from './entities/config.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SysConfigEntity])],
  controllers: [ConfigController],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class SysConfigModule {}
