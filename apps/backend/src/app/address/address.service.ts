import { Injectable } from '@nestjs/common';
import { Address, User } from '@rentigo/models';
import { CreateAddressDto, UpdateAddressDto } from '@rentigo/dto';
import { AddressRepository } from './address.repository';
import { UserRepository } from '../user/user.repository';

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

	async update(updateAddressDto: UpdateAddressDto): Promise<Address> {
		await this.addressRepository.update({ id: updateAddressDto.id }, updateAddressDto);
		return this.addressRepository.findOneBy({ id: updateAddressDto.id });
	}

	async remove(user: User, id: string): Promise<Address> {
		const address = await this.addressRepository.findOneBy({ id });
		await this.userRepository.createQueryBuilder()
			.relation('addresses')
			.of(user)
			.remove(address.id);
		return address;
	}
}
