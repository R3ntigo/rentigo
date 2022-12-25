import { Injectable } from '@nestjs/common';
import { Product, User } from '@rentigo/models';
import { CreateProductDto, UpdateProductDto } from '@rentigo/dto';

import { FindOptionsRelations } from 'typeorm';
import { AddressService } from '../address/address.service';
import { ProductRepository } from './product.repository';
import { RentingPolicyService } from '../renting-policy/renting-policy.service';
import { ResourceService } from '../resource/resource.service';

@Injectable()
export class ProductService {
	constructor(
		private readonly productRepository: ProductRepository,
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
		return this.productRepository.removeOneBy({ id });
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
