import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@rentigo/types';

import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(username: string, rawPassword: string): Promise<User> {
		const user = await this.usersService.findOne(username);
		if (user && user.password === rawPassword) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	login(user: User) {
		const payload = { username: user.username, sub: user.id };
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
}
