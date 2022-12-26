import { Body, Controller, Get, Post, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReqUser } from '@rentigo/decorators';
import { CreateRequestDto, UpdateRequestDto } from '@rentigo/dto';
import { Request, User } from '@rentigo/models';

import { JwtAuthGuard } from '../auth';

import { RequestService } from './request.service';

@ApiTags('Request')
@Controller('request')
@UseGuards(JwtAuthGuard)
export class RequestController {
	constructor(private readonly requestService: RequestService) {}

	@Post()
	Create(@Body() createRequestDto: CreateRequestDto, @ReqUser() user: User): Promise<Request> {
		return this.requestService.create(user, createRequestDto);
	}

	@Get()
	findAll(): Promise<Request[]> {
		return this.requestService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Request> {
		return this.requestService.findOne(id);
	}

	@Patch()
	update(@Body() updateRentingPolicyDto: UpdateRequestDto, @ReqUser() user: User): Promise<Request> {
		return this.requestService.update(user, updateRentingPolicyDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string, @ReqUser() user: User): Promise<Request> {
		return this.requestService.remove(user, id);
	}
}
