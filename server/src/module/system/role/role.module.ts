import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SysRoleEntity } from './entities/role.entity';
import { SysRoleWithDeptEntity } from './entities/role-width-dept.entity';
import { SysRoleWithMenuEntity } from './entities/role-width-menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SysRoleEntity,
      SysRoleWithDeptEntity,
      SysRoleWithMenuEntity,
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
