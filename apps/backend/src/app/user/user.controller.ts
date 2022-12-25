import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {
	}
}
