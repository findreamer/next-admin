import { Global, Module } from '@nestjs/common';
import { LoginlogController } from './loginlog.controller';
import { LoginlogService } from './loginlog.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [LoginlogService],
  controllers: [LoginlogController],
})
export class LoginlogModule {}
