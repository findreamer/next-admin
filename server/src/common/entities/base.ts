import { Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// 基础实体信息
@Entity()
export abstract class BaseEntity {
  /**
   * 0-正常 1-停用
   */
  @ApiProperty({
    type: String,
    description: '状态',
  })
  @Column({
    type: 'char',
    name: 'status',
    length: 1,
    default: '0',
    comment: '状态',
  })
  public status: string;

  /**
   * 0-代表存在 1-代表删除
   */
  @ApiProperty({
    type: String,
    description: '删除标志',
  })
  @Column({
    type: 'char',
    name: 'del_flag',
    default: '0',
    length: 1,
    comment: '删除标志',
  })
  public delFlag: string;

  @ApiProperty({
    type: String,
    description: '创建者',
  })
  @Column({
    type: 'varchar',
    name: 'create_by',
    length: 64,
    default: null,
    comment: '创建者',
  })
  public createBy: string;

  @ApiProperty({
    type: Date,
    description: '创建时间',
  })
  @CreateDateColumn({
    type: 'datetime',
    name: 'create_time',
    update: false,
    default: null,
    comment: '创建时间',
  })
  public createTime: Date;

  @ApiProperty({ type: String, description: '更新者' })
  @Column({
    type: 'varchar',
    name: 'update_by',
    length: 64,
    default: '',
    comment: '更新者',
  })
  public updateBy: string;

  @ApiProperty({ type: Date, description: '更新时间' })
  @UpdateDateColumn({
    type: 'datetime',
    update: false,
    name: 'update_time',
    default: null,
    comment: '更新时间',
  })
  public updateTime: Date;

  @ApiProperty({ type: String, description: '备注' })
  @Column({
    type: 'varchar',
    name: 'remark',
    length: 500,
    default: null,
    comment: '备注',
  })
  public remark: string;
}
