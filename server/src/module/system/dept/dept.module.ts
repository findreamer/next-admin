import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeptController } from './dept.controller';
import { DeptService } from './dept.service';
import { SySDeptEntity } from './entities/dept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SySDeptEntity])],
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule {}
