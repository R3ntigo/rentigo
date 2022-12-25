import { Injectable } from '@nestjs/common';
import { FindOptionsRelations } from 'typeorm';

import { Product, User } from '@rentigo/models';
import { CreateProductDto, UpdateProductDto } from '@rentigo/dto';

import { AddressService } from '../address';
import { RentingPolicyService } from '../renting-policy';
import { ResourceService } from '../resource';
import { UserRepository } from '../user';

import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
	constructor(
		private readonly productRepository: ProductRepository,
		private readonly userRepository: UserRepository,
		private readonly addressService: AddressService,
		private readonly rentingPolicyService: RentingPolicyService,
		private readonly resourceService: ResourceService,
	) {}

	async create(user: User, createProductDto: CreateProductDto): Promise<Product> {
		const product = await this.dtoToEntity(createProductDto);
		product.lender = user;
		return this.productRepository.save(product);
	}

	async findAll(): Promise<Product[]> {
		return this.productRepository.find();
	}

	async findOne(id: string, relations: FindOptionsRelations<Product> = {}): Promise<Product> {
		return this.productRepository.findOne({ where: { id }, relations });
	}

	async update(updateProductDto: UpdateProductDto): Promise<Product> {
		let product = await this.findOne(updateProductDto.id);
		product.imageUrls.map((imageUrl) => this.resourceService.remove(imageUrl.id));
		const updatedProduct = await this.dtoToEntity(updateProductDto);
		updatedProduct.id = product.id;
		product = await this.productRepository.save(updatedProduct);
		return product;
	}

	async remove(id: string): Promise<Product> {
		const product = await this.findOne(id);
		product.lender = null;
		return this.productRepository.save(product);
	}

	private async dtoToEntity(dto: CreateProductDto): Promise<Product> {
		const address = await this.addressService.findOne(dto.address);
		const rentingPolicies = await this.rentingPolicyService.findRange(dto.rentingPolicies);
		const tags = dto.tags.map((tag) => ({ name: tag }));
		const imageUrls = await Promise.all(dto.imageUrls.map((file) => this.resourceService.create(file)));
		const product: Product = {
			title: dto.title,
			description: dto.description,
			address,
			rentingPolicies,
			pricingPolicies: dto.pricingPolicies,
			tags,
			imageUrls,
			totalQuantity: dto.totalQuantity,
			availableQuantity: dto.totalQuantity,
			lender: null,
		};
		return product;
	}
}
