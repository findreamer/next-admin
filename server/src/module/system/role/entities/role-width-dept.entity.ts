import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('sys_role_dept', {
  comment: '角色和部门关联表',
})
export class SysRoleWithDeptEntity {
  @ApiProperty({
    type: Number,
    description: '角色ID',
  })
  @PrimaryColumn({
    type: 'int',
    name: 'role_id',
    default: 0,
    comment: '角色ID',
  })
  public roleId: number;

  @ApiProperty({
    type: Number,
    description: '部门ID',
  })
  @PrimaryColumn({
    type: 'int',
    name: 'dept_id',
    default: 0,
    comment: '部门ID',
  })
  public deptId: number;
}
