import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @IsString()
  @Length(2, 10, { message: '用户名长度必须在2-10之间' })
  username: string;

  @IsString()
  @Length(5, 20, { message: '密码长度必须在5-20之间' })
  password: string;
}

export class ClientInfoDto {
  ipaddr: string;
  userAgent: string;
  browser: string;
  os: string;
  loginLocation: string;
}

export class RegisterDto extends LoginDto {}
