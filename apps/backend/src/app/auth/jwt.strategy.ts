import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from '@rentigo/models';
import { ConfigService } from '@nestjs/config';

import { UserService } from '../user';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private usersService: UserService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => request?.cookies?.ACCESS_TOKEN
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
		});
	}

	// eslint-disable-next-line class-methods-use-this
	validate(payload: User) {
		return payload;
	}
}

export { JwtStrategy };
