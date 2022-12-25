import { Injectable } from '@nestjs/common';
import { FindOptionsRelations } from 'typeorm';
import { compareSync } from 'bcryptjs';

import { User } from '@rentigo/models';

import { StorageService } from '../storage';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
	constructor(
		private userRepository: UserRepository,
		private storageService: StorageService
	) {
		this.storageService.listBuckets().then(console.log);
	}

	async findOne(id: string, relations: FindOptionsRelations<User> = {}): Promise<User> {
		const user = await this.userRepository.findOne({ where: { id }, relations });
		return user;
	}

	async findByEmail(email: string, relations: FindOptionsRelations<User> = {}): Promise<User> {
		const user = await this.userRepository.findByEmail(email, relations);
		return user;
	}

	async getValidatedUser(email: string, password: string): Promise<User> {
		const user = await this.findByEmail(email, { credential: true });
		if (!user) {
			return null;
		}

		const isValid = compareSync(password, user.credential.password);
		if (!isValid) {
			return null;
		}
		return user;
	}
}
