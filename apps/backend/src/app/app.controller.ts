import { Request, UseGuards, Controller, Get, Post } from '@nestjs/common';

import AppService from './app.service';
import LocalAuthGuard from './auth/local/local-auth.guard';

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }
}

export default AppController;
