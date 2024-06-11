import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto';
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
}
