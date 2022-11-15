import { Module } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module({
	providers: [UsersService, UserRepository],
	exports: [UsersService],
	controllers: [UsersController],
})
export class UsersModule {}
