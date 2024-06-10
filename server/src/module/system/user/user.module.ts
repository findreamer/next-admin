import { Module, Global } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/sys-user.entity';
import { SysUserWithPostEntity } from './entities/user-with-post.entity';
import { SysUserwithRoleEntity } from './entities/user-with-role-entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SysUserWithPostEntity,
      SysUserwithRoleEntity,
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
