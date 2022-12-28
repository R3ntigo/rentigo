import { Injectable } from '@nestjs/common';
import { FindOptionsRelations } from 'typeorm';
import { compareSync } from 'bcryptjs';

import { Address, User, RentingPolicy, PricingPolicy } from '@rentigo/models';

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

	// eslint-disable-next-line class-methods-use-this
	async getAllAddresses(user:User): Promise<Address[]> {
		const currUser = await this.findOne(user.id, { addresses: true });
		return currUser.addresses;
	}

	// eslint-disable-next-line class-methods-use-this
	async getRentingPolicy(user:User): Promise<RentingPolicy[]> {
		const currUser = await this.findOne(user.id, { rentingPolicies: true });
		return currUser.rentingPolicies;
	}

	// eslint-disable-next-line class-methods-use-this
	// async getPricingPolicy(user:User): Promise<PricingPolicy[]> {
	// 	const currUser = await this.findOne(user.id, { pricingPolicies: true });
	// 	return currUser.pricingPolicies;
	// }
}
