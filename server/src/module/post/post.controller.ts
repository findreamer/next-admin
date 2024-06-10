import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@ApiTags('岗位管理')
@Controller('system/post')
export class PostController {
  constructor(private readonly postService: PostService) {}
}
