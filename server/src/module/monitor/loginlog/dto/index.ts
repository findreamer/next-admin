import { StatusEnum } from '@app/common/enum';
import { PagingDTO } from '@app/dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateLoginlogDto {
  @IsOptional()
  @IsString()
  @Length(0, 128)
  ipaddr?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  userName?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  loginLocation?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  browser?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  os?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  msg: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class UpdateLoginlogDto extends CreateLoginlogDto {
  @IsNumber()
  infoId: number;
}

export class ListLoginlogDto extends PagingDTO {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 128)
  ipaddr?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  userName?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}
