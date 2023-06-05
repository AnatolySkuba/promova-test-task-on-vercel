import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('latest')
  getRates() {
    return this.appService.getRates();
  }
}
