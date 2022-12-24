import { Module } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module({
	controllers: [UsersController],
	providers: [UsersService, UserRepository],
	exports: [UsersService, UserRepository],
})
export class UsersModule {}
