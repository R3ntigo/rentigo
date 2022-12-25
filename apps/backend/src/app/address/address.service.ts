import { ForbiddenException, Injectable } from '@nestjs/common';

import { Operations } from '@rentigo/constants';
import { Address, User } from '@rentigo/models';
import { CreateAddressDto, UpdateAddressDto } from '@rentigo/dto';

import { UserRepository } from '../user';

import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
	constructor(
		private readonly addressRepository: AddressRepository,
		private readonly userRepository: UserRepository,
	) {}

	async create(user: User, createAddressDto: CreateAddressDto): Promise<Address> {
		const address = await this.addressRepository.save(createAddressDto);
		await this.userRepository.createQueryBuilder()
			.relation('addresses')
			.of(user)
			.add(address);
		return address;
	}

	findAll(): Promise<Address[]> {
		return this.addressRepository.find();
	}

	findOne(id: string): Promise<Address> {
		return this.addressRepository.findOneBy({ id });
	}

	async update(user: User, updateAddressDto: UpdateAddressDto): Promise<Address> {
		const isPermitted = await this.hasPermissionTo(Operations.UPDATE, user, updateAddressDto.id);
		if (!isPermitted) {
			throw new ForbiddenException();
		}
		await this.addressRepository.update({ id: updateAddressDto.id }, updateAddressDto);
		return this.findOne(updateAddressDto.id);
	}

	async remove(user: User, id: string): Promise<Address> {
		const isPermitted = await this.hasPermissionTo(Operations.DELETE, user, id);
		if (!isPermitted) {
			throw new ForbiddenException();
		}
		const address = await this.findOne(id);
		await this.userRepository.createQueryBuilder()
			.relation('addresses')
			.of(user)
			.remove(address.id);
		return address;
	}

	async hasPermissionTo(_: Operations, user: User, id: string) {
		// check whether the user has the associated address
		try {
			const userWithAddress = await this.userRepository.findOne({
				relations: { addresses: true },
				where: { id: user.id, addresses: { id } }
			});
			return !!userWithAddress;
		} catch (error) {
			return false;
		}
	}
}
