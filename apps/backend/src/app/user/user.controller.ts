import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqUser } from '@rentigo/decorators';
import { User } from '@rentigo/models';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
	constructor(private userService: UserService) {
	}

	// create a controller to get all the addresses of a user
	@Get('addresses')
	getAllAddresses(@ReqUser() user: User) {
		console.log('user', user);
		return this.userService.getAllAddresses(user);
	}

	@Get('rentingPolicy')
	getRentingPolicy(@ReqUser() user: User) {
		console.log('user', user);
		return this.userService.getRentingPolicy(user);
	}

	// @Get('pricingPolicy')
	// getPricingPolicy(@ReqUser() user: User) {
	// 	console.log('user', user);
	// 	return this.userService.getPricingPolicy(user);
	// }
}
