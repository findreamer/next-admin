import { PagingDTO } from '@app/dto';
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
export enum TypeEnum {
  YES = 'Y',
  NO = 'N',
}

export class CreateConfigDto {
  @IsString()
  @Length(0, 100)
  configName: string;

  @Length(0, 100)
  @IsString()
  configKey: string;

  @Length(0, 500)
  @IsString()
  configValue: string;

  @IsString()
  @IsEnum(TypeEnum)
  configType: string;

  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class UpdateConfigDto extends CreateConfigDto {
  @IsNumber()
  configId: number;
}

export class ListConfigDto extends PagingDTO {
  @IsOptional()
  @IsString()
  @Length(0, 100)
  configName?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  configKey?: string;

  @IsOptional()
  @IsString()
  @IsEnum(TypeEnum)
  configType?: string;
}
