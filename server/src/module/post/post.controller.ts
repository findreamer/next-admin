import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto, ListPostDto } from './dto';
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
}
