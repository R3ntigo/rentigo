import { Request, UseGuards, Controller, Get, Post } from '@nestjs/common';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  welcome() {
    return this.appService.welcome();
  }

  // eslint-disable-next-line class-methods-use-this
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }
}
