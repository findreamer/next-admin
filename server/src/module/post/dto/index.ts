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

export class CreatePostDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '岗位名称',
  })
  @IsString()
  @Length(0, 50)
  postName: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '岗位编码',
  })
  @IsString()
  @Length(0, 64)
  postCode: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @ApiProperty({
    type: String,
    required: false,
    description: '备注',
  })
  @IsOptional() // 可选的
  @IsString()
  @Length(0, 500)
  remark?: string;

  @ApiProperty({
    required: true,
    description: '显示排序',
  })
  @IsOptional()
  @IsNumber()
  postSort?: number;
}

export class UpdatePostDto extends CreatePostDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  postId: number;
}

export class ListPostDto extends PagingDTO {
  @IsOptional()
  @IsString()
  @Length(0, 50)
  postName?: string;

  @IsOptional()
  @IsString()
  @Length(0, 64)
  postCode?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}
