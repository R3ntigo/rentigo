import {
	Req,
	Res,
	UseGuards,
	Controller,
	Get,
	Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { addHours } from 'date-fns';

import { SignInDto } from '@rentigo/dto';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService
	) {}

	// eslint-disable-next-line class-methods-use-this
	@UseGuards(JwtAuthGuard)
	@Get('/authorized')
	async authorized() {
		return true;
	}

	@ApiBody({ type: SignInDto })
	@UseGuards(LocalAuthGuard)
	@Post('sign-in')
	signIn(@Req() req, @Res() res: Response) {
		const { accessToken } = this.authService.login(req.user);
		res.cookie('ACCESS_TOKEN', accessToken, {
			expires: addHours(new Date(), 3),
			httpOnly: true,
			sameSite: true
		});
		return res.json({ message: 'sign-in successful' });
	}

	// eslint-disable-next-line class-methods-use-this
	@UseGuards(JwtAuthGuard)
	@Get('sign-out')
	signOut(@Res() res: Response) {
		res.clearCookie('ACCESS_TOKEN');
		return res.json({ message: 'sign-out successful' });
	}
}
