import { StatusEnum } from '@app/common/enum';
import { PagingDTO } from '@app/dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ required: true, description: '角色名称' })
  @IsString()
  @Length(0, 30)
  roleName: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 100)
  roleKey: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  menuIds?: Array<number>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  deptIds?: Array<number>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  roleSort?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  dataScope: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @IsOptional()
  @IsBoolean()
  menuCheckStrictly?: boolean;

  @IsOptional()
  @IsBoolean()
  deptCheckStrictly?: boolean;
}

export class UpdateRoleDto extends CreateRoleDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  roleId: number;
}

export class ChangeStatusDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  roleId: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsEnum(StatusEnum)
  status: string;
}

export class ListRoleDto extends PagingDTO {
  @ApiProperty({ required: false, description: '角色名称' })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  roleName?: string;

  @ApiProperty({ required: false, description: '角色编码' })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  roleKey?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @ApiProperty({ required: false, description: '角色ID' })
  @IsOptional()
  @IsString()
  roleId?: string;
}
