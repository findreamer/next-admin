import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('根目录')
@Controller('/')
export class MainController {}
