import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export enum MenuTypeEnum {
  M = 'M',
  C = 'C',
  F = 'F',
}

export class CreateMenuDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @Length(0, 50)
  menuName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  orderNum?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 200)
  path: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 200)
  query?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  component?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  icon?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(MenuTypeEnum)
  menuType: MenuTypeEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  isCache: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsEnum(StatusEnum)
  isFrame: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  visible: string;
}
