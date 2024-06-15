import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * 时间区间对象
 */
export class DateParamDTO {
  @IsDateString()
  beginTime: string;

  @IsDateString()
  endTime: string;
}

export class PagingDTO {
  @ApiProperty({ required: true })
  @IsNumberString()
  pageNum: number;

  @ApiProperty({ required: true })
  @IsNumberString()
  pageSize: number;

  /**
   * 时间区间
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  params?: DateParamDTO;

  /**
   * 排序字段
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orderByColumn?: string;

  /**
   * 排序规则
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  isAsc?: 'ascending' | 'descending';
}
