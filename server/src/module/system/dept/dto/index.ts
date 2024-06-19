import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

import { StatusEnum } from '@app/common/enum';
export class CreateDeptDto {
  @ApiProperty({
    type: Number,
    description: '父部门ID',
    required: true,
  })
  @IsNumber()
  parentId: number;

  @ApiProperty({
    type: String,
    description: '部门名称',
    required: true,
  })
  @IsString()
  @Length(0, 30)
  deptName: string;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @Min(0)
  orderNum: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  leader?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 11)
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class UpdateDeptDto extends CreateDeptDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  deptId: number;
}

export class ListDeptDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  deptName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}
