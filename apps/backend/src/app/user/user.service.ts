import { Injectable } from '@nestjs/common';
import { User } from '@rentigo/types';
import { StorageService } from '../storage/storage.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
	constructor(
		private userRepository: UserRepository,
		private storageService: StorageService
	) {
		storageService.listBuckets().then(console.log);
		userRepository.findBy({ email: 'a@gmail.com' }).then(console.log);
	}

	private readonly users: User[] = [
		{
			id: 1,
			username: 'john',
			password: 'changeme',
		},
		{
			id: 2,
			username: 'maria',
			password: 'guess',
		},
	];

	async findOne(username: string): Promise<User> {
		return this.users.find((user) => user.username === username);
	}
}
