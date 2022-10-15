import {
	Req,
	Res,
	UseGuards,
	Controller,
	Get,
	Post,
} from '@nestjs/common';
import { Response } from 'express';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
	constructor(
		private appService: AppService,
		private authService: AuthService
	) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	welcome() {
		return this.appService.welcome();
	}

	@UseGuards(LocalAuthGuard)
	@Post('sign-in')
	login(@Req() req, @Res() res: Response) {
		const { accessToken } = this.authService.login(req.user);
		res.cookie('ACCESS_TOKEN', accessToken, { httpOnly: true });
		return res.json(req.user);
	}
}
