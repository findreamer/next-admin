import { Global, Module } from '@nestjs/common';
import { LoginlogController } from './loginlog.controller';
import { LoginlogService } from './loginlog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorLoginlogEntity } from './entities/loginlog.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MonitorLoginlogEntity])],
  providers: [LoginlogService],
  controllers: [LoginlogController],
  exports: [LoginlogService],
})
export class LoginlogModule {}
