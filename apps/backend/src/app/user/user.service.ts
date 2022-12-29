import { Injectable } from '@nestjs/common';
import { FindOptionsRelations } from 'typeorm';
import { compareSync } from 'bcryptjs';

import { Address, User, RentingPolicy, Review } from '@rentigo/models';

import { StorageService } from '../storage';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
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

	async addReview(id: string, review: Review) {
		const user = await this.findOne(id);
		this.userRepository.createQueryBuilder()
			.relation('receivedReviews')
			.of(user)
			.add(review);
	}

	async findAllReviews(id: string) {
		const userWithReviews = await this.findOne(id, { receivedReviews: true });
		return userWithReviews.receivedReviews;
	}

	async getAllAddresses(user:User): Promise<Address[]> {
		const currUser = await this.findOne(user.id, { addresses: true });
		return currUser.addresses;
	}

	async getRentingPolicy(user:User): Promise<RentingPolicy[]> {
		const currUser = await this.findOne(user.id, { rentingPolicies: true });
		return currUser.rentingPolicies;
	}
}
