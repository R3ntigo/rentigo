import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from '@rentigo/types';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private usersService: UsersService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
				const data = request?.cookies.ACCESS_TOKEN;
				if (!data) {
					return null;
				}
				return data.token;
			}]),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
		});
	}

	async validate(payload: User) {
		const { username } = payload;
		const user = await this.usersService.findOne(username);
		return user;
	}
}

export { JwtStrategy };
