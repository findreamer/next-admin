import { Module, Global } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/sys-user.entity';
import { SysUserWithPostEntity } from './entities/user-with-post.entity';
import { SysUserWithRoleEntity } from './entities/user-with-role-entity';
import { SysDeptEntity } from '../dept/entities/dept.entity';
import { SysRoleEntity } from '../role/entities/role.entity';
import { SysPostEntity } from '../post/entities/post.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SysDeptEntity,
      SysRoleEntity,
      SysPostEntity,
      SysUserWithPostEntity,
      SysUserWithRoleEntity,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get<string>('jwt.secretkey'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
