import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '@rentigo/dto';
import { User } from '@rentigo/models';

import { UserService } from '../user';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService
	) {}

	async validateUser(signInDto: SignInDto): Promise<User> {
		const user = await this.usersService.getValidatedUser(signInDto.username, signInDto.password);
		return user;
	}

	login(user: User) {
		const payload = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phone: user.phone,
			photoUrl: user.photoUrl,
			nid: user.nid,
			gender: user.gender,
		};
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
}
