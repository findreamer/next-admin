import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_logininfor', {
  comment: '系统访问记录',
})
export class MonitorLoginlogEntity {
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
}
