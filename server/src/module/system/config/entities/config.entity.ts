import { BaseEntity } from '@app/common/entities/base';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_config')
export class SysConfigEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'config_id',
    comment: '主键ID',
  })
  public configId: number;

  @Column({
    type: 'varchar',
    name: 'config_name',
    length: 100,
    default: '',
    comment: '参数名称',
  })
  public configName: string;

  @Column({
    type: 'varchar',
    name: 'config_key',
    length: 100,
    default: '',
    comment: '参数键名',
  })
  public configKey: string;

  @Column({
    type: 'varchar',
    name: 'config_value',
    length: 500,
    default: '',
    comment: '参数值',
  })
  public configValue: string;

  //系统内置（Y是 N否）
  @Column({
    type: 'char',
    name: 'config_type',
    length: 1,
    default: 'N',
    comment: '系统内置',
  })
  public configType: string;
}
