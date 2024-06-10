import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetNowDate, ResultData } from '@app/common/utils';
import { CreateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/sys-user.entity';
import { SYS_USER_TYPE } from '@app/common/constant';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const loginDate = GetNowDate();

    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        bcrypt.genSaltSync(10),
      );
    }
    const res = await this.userRepository.save({
      ...createUserDto,
      loginDate,
      userType: SYS_USER_TYPE.CUSTOM,
    });
    // 待完成postEntity、roleEntity

    return ResultData.success();
  }

  /**
   * 从令牌中获取数据
   * @param token
   * @returns
   */
  async parseToken(token: string) {
    try {
      if (!token) return null;

      const payload = await this.jwtService.verifyAsync<any>(
        token.replace('Bearer ', ''),
      );
      return payload;
    } catch (error) {
      return null;
    }
  }
}
