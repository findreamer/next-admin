import { BaseEntity } from '@app/common/entities/base';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sys_logininfor', {
  comment: '系统访问记录',
})
export class MonitorLoginlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'infor_id',
    comment: '访问记录ID',
  })
  public inforId: number;

  @Column({
    type: 'varchar',
    name: 'user_name',
    length: 50,
    comment: '用户账号',
  })
  public userName: string;

  @Column({
    type: 'varchar',
    name: 'ipaddr',
    length: 128,
    default: '',
    comment: '登录IP地址',
  })
  public ipaddr: string;

  @Column({
    type: 'varchar',
    name: 'login_location',
    length: 255,
    default: '',
    comment: '登录地点',
  })
  public loginLocation: string;

  @Column({
    type: 'varchar',
    name: 'browser',
    length: 50,
    default: '',
    comment: '浏览器类型',
  })
  public browser: string;

  @Column({
    type: 'varchar',
    name: 'os',
    length: 50,
    default: '',
    comment: '操作系统',
  })
  public os: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'login_time',
    comment: '访问时间',
  })
  public loginTime: Date;

  @Column({
    type: 'varchar',
    name: 'msg',
    length: 255,
    default: '',
    comment: '提示消息',
  })
  public msg: string;
}
