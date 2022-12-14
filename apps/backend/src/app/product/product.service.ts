import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsRelations } from 'typeorm';

import { Product, Review, User } from '@rentigo/models';
import { CreateProductDto, UpdateProductDto } from '@rentigo/dto';

import { Operations } from '@rentigo/constants';
import { AddressService } from '../address';
import { RentingPolicyService } from '../renting-policy';
import { ResourceService } from '../resource';
import { UserRepository } from '../user';

import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
	constructor(
		private readonly productRepository: ProductRepository,
		private readonly addressService: AddressService,
		private readonly rentingPolicyService: RentingPolicyService,
		private readonly resourceService: ResourceService,
	) {}

	async create(user: User, createProductDto: CreateProductDto): Promise<Product> {
		console.log('createProductDto', createProductDto);
		const product = await this.dtoToEntity(createProductDto);
		product.lender = user;
		return this.productRepository.save(product);
	}

	async findAll(): Promise<Product[]> {
		return this.productRepository.find({
			skip: Math.floor(Math.random() * 100),
			take: 10,
		});
	}

	async findOne(id: string, relations: FindOptionsRelations<Product> = {}): Promise<Product> {
		const product = this.productRepository.findOne({ where: { id }, relations: { ...relations, rentingPolicies: true } });
		if (!product) {
			throw new NotFoundException();
		}
		return product;
	}

	async update(user: User, updateProductDto: UpdateProductDto): Promise<Product> {
		let product = await this.findOne(updateProductDto.id);
		if (product.lender.id !== user.id) {
			throw new ForbiddenException();
		}
		product.imageUrls.map((imageUrl) => this.resourceService.remove(imageUrl.id));
		const updatedProduct = await this.dtoToEntity(updateProductDto);
		updatedProduct.id = product.id;
		product = await this.productRepository.save(updatedProduct);
		return product;
	}

	async remove(user: User, id: string): Promise<Product> {
		const isPermitted = await this.hasPermissionTo(Operations.DELETE, user, id);
		if (!isPermitted) {
			throw new ForbiddenException();
		}
		return this.productRepository.softRemoveOneBy({ id });
	}

	async addReview(id: string, review: Review) {
		const product = await this.findOne(id);
		this.productRepository.createQueryBuilder()
			.relation('reviews')
			.of(product)
			.add(review);
	}

	async findAllReviews(id: string) {
		const productWithReviews = await this.findOne(id, { reviews: true });
		return productWithReviews.reviews;
	}

	async getProductByPagination(page: number, limit: number) {
		const products = await this.productRepository.find({
			skip: (page - 1) * limit,
			take: limit,
		});
		return products;
	}

	async hasPermissionTo(_: Operations, user: User, id: string) {
		try {
			const userWithProduct = await this.productRepository.findOne({
				relations: { lender: true },
				where: { id, lender: { id: user.id } },
			});
			return !!userWithProduct;
		} catch (error) {
			return false;
		}
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
			reviews: null,
		};
		return product;
	}
}
