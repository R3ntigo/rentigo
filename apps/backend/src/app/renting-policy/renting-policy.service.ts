import { Injectable } from '@nestjs/common';
import { FindOptionsRelations, In } from 'typeorm';

import { RentingPolicy, User } from '@rentigo/models';
import { CreateRentingPolicyDto, UpdateRentingPolicyDto } from '@rentigo/dto';

import { UserRepository } from '../user';

import { RentingPolicyRepository } from './renting-policy.repository';

@Injectable()
export class RentingPolicyService {
	constructor(
		private readonly rentingPolicyRepository: RentingPolicyRepository,
		private readonly userRepository: UserRepository,
	) {}

	create(user: User, createRentingPolicyDto: CreateRentingPolicyDto): Promise<RentingPolicy> {
		const rentingPolicy: RentingPolicy = {
			user,
			title: createRentingPolicyDto.title,
			shortDescription: createRentingPolicyDto.shortDescription,
			legalDescription: createRentingPolicyDto.legalDescription,
		};
		return this.rentingPolicyRepository.save(rentingPolicy);
	}

	findOne(id: string, relations: FindOptionsRelations<RentingPolicy> = {}): Promise<RentingPolicy> {
		return this.rentingPolicyRepository.findOne({ where: { id }, relations });
	}

	findRange(ids: string[]): Promise<RentingPolicy[]> {
		return this.rentingPolicyRepository.findBy({ id: In(ids) });
	}

	findAll(): Promise<RentingPolicy[]> {
		return this.rentingPolicyRepository.find();
	}

	async update(updateRentingPolicyDto: UpdateRentingPolicyDto): Promise<RentingPolicy> {
		const oldPolicy = await this.findOne(updateRentingPolicyDto.id, { user: true });
		const updatedOldPolicy = {
			...oldPolicy,
			...updateRentingPolicyDto,
		};

		const newPolicy = {
			title: updatedOldPolicy.title,
			shortDescription: updatedOldPolicy.shortDescription,
			legalDescription: updatedOldPolicy.legalDescription,
		};

		await this.remove(oldPolicy.user, oldPolicy.id);
		return this.create(oldPolicy.user, newPolicy);
	}

	async remove(user: User, id: string): Promise<RentingPolicy> {
		await this.userRepository.createQueryBuilder()
			.relation('rentingPolicies')
			.of(user)
			.remove(id);
		const rentingPolicy = await this.findOne(id);
		return rentingPolicy;
	}
}
