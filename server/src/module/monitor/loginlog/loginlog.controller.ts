import { Controller } from '@nestjs/common';
import { LoginlogService } from './loginlog.service';

@Controller('monitor/logininfor')
export class LoginlogController {
  constructor(private readonly loginlogService: LoginlogService) {}
}
