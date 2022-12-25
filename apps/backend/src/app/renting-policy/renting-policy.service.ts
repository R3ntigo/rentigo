import { ForbiddenException, Injectable } from '@nestjs/common';
import { FindOptionsRelations, In } from 'typeorm';

import { RentingPolicy, User } from '@rentigo/models';
import { CreateRentingPolicyDto, UpdateRentingPolicyDto } from '@rentigo/dto';

import { Operations } from '@rentigo/constants';

import { RentingPolicyRepository } from './renting-policy.repository';

@Injectable()
export class RentingPolicyService {
	constructor(
		private readonly rentingPolicyRepository: RentingPolicyRepository,
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

	async update(user: User, updateRentingPolicyDto: UpdateRentingPolicyDto): Promise<RentingPolicy> {
		const oldPolicy = await this.findOne(updateRentingPolicyDto.id);
		if (oldPolicy.user.id !== user.id) {
			throw new ForbiddenException();
		}

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
		const rentingPolicy = await this.findOne(id);
		if (rentingPolicy.user.id !== user.id) {
			throw new ForbiddenException();
		}
		await this.rentingPolicyRepository.softRemoveOneBy({ id });
		return rentingPolicy;
	}

	async hasPermissionTo(_: Operations, user: User, id: string) {
		try {
			const userWithPolicy = await this.findOne(id);
			return userWithPolicy.user.id === user.id;
		} catch (e) {
			return false;
		}
	}
}
