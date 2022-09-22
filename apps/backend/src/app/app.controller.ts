import { Controller, Get } from '@nestjs/common';

import AppService from './app.service';

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}

export default AppController;
