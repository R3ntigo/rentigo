import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsRelations, In } from 'typeorm';

import { Request, User } from '@rentigo/models';
import { CreateRequestDto, UpdateRequestDto } from '@rentigo/dto';

import { Operations, RequestStatus } from '@rentigo/constants';

import { RequestRepository } from './request.repository';
import { ProductService } from '../product';
import { AddressService } from '../address';

@Injectable()
export class RequestService {
	constructor(
		private readonly requestRepository: RequestRepository,
		private readonly productService: ProductService,
		private readonly addressService: AddressService,
	) {}

	async create(user: User, createRequestDto: CreateRequestDto): Promise<Request> {
		const request = await this.dtoToEntity(createRequestDto);
		request.borrower = user;
		return this.requestRepository.save(request);
	}

	private async dtoToEntity(dto: CreateRequestDto): Promise<Request> {
		const product = await this.productService.findOne(dto.product);
		const address = await this.addressService.findOne(dto.address);
		const request: Request = {
			product,
			quantity: dto.quantity,
			address,
			duration: dto.duration,
			borrower: null,
			status: RequestStatus.PENDING,
		};
		return request;
	}
}
