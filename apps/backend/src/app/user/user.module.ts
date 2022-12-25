import { Module } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserService, UserRepository],
})
export class UserModule {}
