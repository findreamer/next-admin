import { Module, Global } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
@Global()
@Module({
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {
  constructor(private readonly mainService: MainService) {}
}
