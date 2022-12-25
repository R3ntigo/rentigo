import {
	Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Inject, UseGuards, UploadedFiles
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ReqUser } from '@rentigo/decorators';
import { CreateProductDto, UpdateProductDto } from '@rentigo/dto';
import { User } from '@rentigo/models';

import { JwtAuthGuard } from '../auth';

import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
	constructor(
		private readonly productService: ProductService
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
}
