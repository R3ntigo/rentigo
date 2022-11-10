import { Module } from '@nestjs/common';

import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
	providers: [UsersService, UserRepository],
	exports: [UsersService],
	controllers: [UsersController],
})
export class UsersModule {}
