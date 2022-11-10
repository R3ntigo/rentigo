import {
	Req,
	Res,
	UseGuards,
	Controller,
	Get,
	Post,
} from '@nestjs/common';
import { Response } from 'express';
import { addHours } from 'date-fns';

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

	// eslint-disable-next-line class-methods-use-this
	@UseGuards(JwtAuthGuard)
	@Get('/authorized')
	async authorized() {
		return true;
	}

	@UseGuards(LocalAuthGuard)
	@Post('sign-in')
	login(@Req() req, @Res() res: Response) {
		const { accessToken } = this.authService.login(req.user);
		res.cookie('ACCESS_TOKEN', accessToken, {
			expires: addHours(new Date(), 1),
			httpOnly: true,
			sameSite: true
		});
		return res.json({ message: 'Login successful', payload: req.user });
	}

	// eslint-disable-next-line class-methods-use-this
	@UseGuards(JwtAuthGuard)
	@Get('sign-out')
	logout(@Res() res: Response) {
		res.clearCookie('ACCESS_TOKEN');
		return res.json({ message: 'Logout successful' });
	}
}
