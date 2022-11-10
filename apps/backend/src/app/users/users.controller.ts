import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
	// get all users
	constructor(private userService: UsersService) {
	}

	@Get()
	printHello(email: string) {
		this.userService.printHello();
	}
}
