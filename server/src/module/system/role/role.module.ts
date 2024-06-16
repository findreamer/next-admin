import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SysRoleEntity } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysRoleEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
