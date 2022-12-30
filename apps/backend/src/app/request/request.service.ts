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
		const request = await this.CreateDtoToEntity(createRequestDto);
		request.borrower = user;
		return this.requestRepository.save(request);
	}

	async findAll(): Promise<Request[]> {
		return this.requestRepository.find();
	}

	async findOne(id: string, relations: FindOptionsRelations<Request> = {}): Promise<Request> {
		const request = this.requestRepository.findOne({ where: { id }, relations: { ...relations, product: true, borrower: true } });
		if (!request) {
			throw new NotFoundException();
		}
		return request;
	}

	async accept(user: User, id: string): Promise<Request> {
		const request = await this.findOne(id);
		if (request.product.lender.id !== user.id) {
			throw new ForbiddenException();
		}
		if (request.status !== RequestStatus.PENDING) {
			throw new ForbiddenException();
		}
		request.status = RequestStatus.APPROVED;
		return this.requestRepository.save(request);
	}

	async reject(user: User, id: string): Promise<Request> {
		const request = await this.findOne(id);
		if (request.product.lender.id !== user.id) {
			throw new ForbiddenException();
		}
		if (request.status !== RequestStatus.PENDING) {
			throw new ForbiddenException();
		}
		request.status = RequestStatus.REJECTED;
		return this.requestRepository.save(request);
	}

	async update(user: User, updateRequestDto: UpdateRequestDto): Promise<Request> {
		let request = await this.findOne(updateRequestDto.id);
		if (request.borrower.id !== user.id) {
			throw new ForbiddenException();
		}
		const updatedRequest = await this.partialDtoToEntity(updateRequestDto);
		updatedRequest.id = request.id;
		request = await this.requestRepository.save(updatedRequest);
		return request;
	}

	async remove(user: User, id: string): Promise<Request> {
		const isPermitted = await this.hasPermissionTo(Operations.DELETE, user, id);
		if (!isPermitted) {
			throw new ForbiddenException();
		}
		return this.requestRepository.softRemoveOneBy({ id });
	}

	async findByPage(page: number): Promise<Request[]> {
		const skip = (page - 1) * 10;
		return this.requestRepository.find({ skip, take: 10 });
	}

	async hasPermissionTo(_: Operations, user: User, id: string) {
		try {
			const userWithProduct = await this.requestRepository.findOne({
				relations: { borrower: true },
				where: { id, borrower: { id: user.id } },
			});
			return !!userWithProduct;
		} catch (error) {
			return false;
		}
	}

	private async CreateDtoToEntity(dto: CreateRequestDto): Promise<Request> {
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

	private async partialDtoToEntity(dto: UpdateRequestDto): Promise<Request> {
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
