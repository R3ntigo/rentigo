import {
	Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Inject, UseGuards, UploadedFiles
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ReqUser } from '@rentigo/decorators';
import { CreateProductDto, UpdateProductDto, CreateReviewDto, UpdateReviewDto } from '@rentigo/dto';
import { User, Review } from '@rentigo/models';

import { JwtAuthGuard } from '../auth';

import { ProductService } from './product.service';
import { ReviewService } from '../review';

@ApiTags('Product')
@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
	constructor(
		private readonly productService: ProductService,
		private readonly reviewService: ReviewService
	) {
	}

	@Post()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FilesInterceptor('imageUrls', 100))
	async create(
	@Body() createProductDto: CreateProductDto,
		@ReqUser() user: User,
		@UploadedFiles() files: Express.Multer.File[]
	) {
		const createProductDtoWithImageUrls = {
			...createProductDto,
			imageUrls: files
		};
		return this.productService.create(user, createProductDtoWithImageUrls);
	}

	@Get()
	findAll() {
		return this.productService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productService.findOne(id);
	}

	@Patch()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FilesInterceptor('imageUrls', 100))
	update(
	@Body() updateProductDto: UpdateProductDto,
		@UploadedFiles() files: Express.Multer.File[],
		@ReqUser() user: User,
	) {
		const updateProductDtoWithImageUrls = {
			...updateProductDto,
			imageUrls: files
		};
		return this.productService.update(user, updateProductDtoWithImageUrls);
	}

	@Delete(':id')
	remove(@Param('id') id: string, @ReqUser() user: User) {
		return this.productService.remove(user, id);
	}

	@Post('review/:id')
	async postReview(
		@Param('id') id:string,
			@Body() createReviewDto: CreateReviewDto,
			@ReqUser() user:User): Promise<Review> {
		const review = await this.reviewService.create(user, createReviewDto);
		this.productService.addReview(id, review);
		return review;
	}

	@Patch('review/:id')
	updateReview(@Body() updateReviewDto: UpdateReviewDto, @ReqUser() user: User): Promise<Review> {
		return this.reviewService.update(user, updateReviewDto);
	}

	@Get('reviews/:id')
	getReviews(@Param('id') id: string) {
		return this.productService.findAllReviews(id);
	}

	// get product by pagination
	@Get('pagination/:page')
	getProductByPagination(@Param('page') page: number) {
		return this.productService.getProductByPagination(page, 10);
	}
}
