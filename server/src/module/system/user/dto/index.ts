import {
  IsNumber,
  IsOptional,
  Length,
  IsEmail,
  IsString,
  IsArray,
  IsEnum,
  IsPhoneNumber,
  IsNumberString,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { StatusEnum } from '@app/common/enum';
import { PagingDTO } from '@app/dto';

export enum SexEnum {
  MALE = '0',
  FEMALE = '1',
  UNKNOWN = '2',
}

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  deptId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  // @IsEmail()
  @Length(0, 50)
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 30)
  nickName: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 30)
  userName: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 200)
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  // @IsPhoneNumber('CN')
  phonenumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  postIds?: Array<number>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  roleIds?: Array<number>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(SexEnum)
  sex?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsNumber()
  postSort?: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  userId: number;
}

export class ChangeStatusDto {
  @ApiProperty({
    description: '用户ID',
    required: true,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsEnum(StatusEnum)
  status: number;
}

export class ListUserDto extends PagingDTO {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  deptId?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  nickName?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  email?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  userName?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  phonenumber?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class ResetPwdDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Length(5, 20)
  password: string;
}

export class AllocatedListDto extends PagingDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  userName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phonenumber?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  roleId?: string;
}
