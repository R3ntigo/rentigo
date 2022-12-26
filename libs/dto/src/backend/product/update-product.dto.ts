import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMinSize, IsNotEmpty, IsUUID } from 'class-validator';
import { CreatePricingPolicyDto } from '../pricing-policy';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID(4)
	id: string;

	@ApiProperty({
		example: 'Product Title',
	})
	@IsNotEmpty()
	title: string;

	@ApiProperty({
		example: 'Product Description',
	})
	@IsNotEmpty()
	description: string;

	@ApiProperty({
		example: '0e317059-2b04-4488-98cc-4559c9ecfdac',
	})
	@IsUUID(4)
	@IsNotEmpty()
	address: string;

	@ApiProperty({
		example: ['d36f7194-57f8-43c2-91c7-56d534df7786', '77943d14-7ebb-43c1-b35b-277a8fc0b31e'],
	})
	@IsUUID(4, { each: true })
	@ArrayMinSize(1)
	rentingPolicies: string[];

	@ApiProperty({
		type: [CreatePricingPolicyDto],
		format: 'object',
	})
	@ArrayMinSize(1)
	pricingPolicies: CreatePricingPolicyDto[];

	@ApiProperty({
		example: ['Tag 1', 'Tag 2'],
	})
	@ArrayMinSize(1)
	tags: string[];

	@ApiProperty({
		required: false,
	})
	family?: string;

	// category;

	@ApiProperty({
		type: 'file',
		isArray: true,
	})
	imageUrls: Express.Multer.File[];

	@ApiProperty({
		example: 10,
	})
	totalQuantity: number;
}
