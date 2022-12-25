import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReqUser } from '@rentigo/decorators';
import { CreateRentingPolicyDto, UpdateRentingPolicyDto } from '@rentigo/dto';
import { RentingPolicy, User } from '@rentigo/models';

import { JwtAuthGuard } from '../auth';

import { RentingPolicyService } from './renting-policy.service';

@ApiTags('Renting Policy')
@Controller('renting-policy')
@UseGuards(JwtAuthGuard)
export class RentingPolicyController {
	constructor(private readonly rentingPolicyService: RentingPolicyService) {}

	@Post()
	create(@Body() createRentingPolicyDto: CreateRentingPolicyDto, @ReqUser() user: User): Promise<RentingPolicy> {
		return this.rentingPolicyService.create(user, createRentingPolicyDto);
	}

	@Get()
	findAll(): Promise<RentingPolicy[]> {
		return this.rentingPolicyService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<RentingPolicy> {
		return this.rentingPolicyService.findOne(id);
	}

	@Patch()
	update(@Body() updateRentingPolicyDto: UpdateRentingPolicyDto): Promise<RentingPolicy> {
		return this.rentingPolicyService.update(updateRentingPolicyDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string, @ReqUser() user: User): Promise<RentingPolicy> {
		return this.rentingPolicyService.remove(user, id);
	}
}
