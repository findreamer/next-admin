import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto, ListPostDto, UpdatePostDto } from './dto';
import { AllowAnon } from '@app/common/decorators/allow-anon.decorator';

@ApiTags('岗位管理')
@Controller('system/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: '岗位管理-创建',
  })
  @ApiBody({
    type: CreatePostDto,
    required: true,
  })
  @Post()
  @AllowAnon()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({
    summary: '岗位管理-列表',
  })
  @ApiQuery({
    required: true,
  })
  @Get('/list')
  @AllowAnon()
  findAll(@Query() query: ListPostDto) {
    return this.postService.findAll(query);
  }

  @ApiOperation({
    summary: '岗位管理-详情',
  })
  @Get(':id')
  @AllowAnon()
  findOne(@Param('id') id: string) {
    return this.postService.findeOne(+id);
  }

  @ApiOperation({
    summary: '岗位管理-更新',
  })
  @ApiBody({
    type: UpdatePostDto,
    required: true,
  })
  @Put()
  @AllowAnon()
  update(@Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(updatePostDto);
  }

  @ApiOperation({
    summary: '岗位管理-删除',
  })
  @Delete(':id')
  @AllowAnon()
  delete(@Param('id') id: string) {
    const menuIds = id
      .split(',')
      .map((id) => id)
      .filter((id) => id);
    return this.postService.delete(menuIds);
  }
}
