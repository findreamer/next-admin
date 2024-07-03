import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { ToolService } from './tool.service';

@ApiTags('系统工具')
@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}
}
