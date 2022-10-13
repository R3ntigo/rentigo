import { Request, UseGuards, Controller, Get, Post } from '@nestjs/common';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  welcome() {
    return this.appService.welcome();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
