import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('sys_role_menu', {
  comment: '角色和菜单关联表',
})
export class SysRoleWithMenuEntity {
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
    description: '菜单ID',
  })
  @PrimaryColumn({
    type: 'int',
    name: 'menu_id',
    default: 0,
    comment: '菜单ID',
  })
  public menuId: number;
}
