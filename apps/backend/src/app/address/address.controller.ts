import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Address, User } from '@rentigo/models';
import { CreateAddressDto, UpdateAddressDto } from '@rentigo/dto';
import { ReqUser } from '@rentigo/decorators';

import { JwtAuthGuard } from '../auth';

import { AddressService } from './address.service';

@ApiTags('Address')
@Controller('address')
@UseGuards(JwtAuthGuard)
export class AddressController {
	constructor(private readonly addressService: AddressService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createAddressDto: CreateAddressDto, @ReqUser() user: User): Promise<Address> {
		return this.addressService.create(user, createAddressDto);
	}

	@Get()
	findAll() {
		return this.addressService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.addressService.findOne(id);
	}

	@Patch()
	update(@Body() updateAddressDto: UpdateAddressDto): Promise<Address> {
		return this.addressService.update(updateAddressDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string, @ReqUser() user: User): Promise<Address> {
		return this.addressService.remove(user, id);
	}
}
