import 'multer';
import { ArrayMinSize, IsNotEmpty, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { CreatePricingPolicyDto } from '../pricing-policy';

export class CreateProductDto {
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
		example: '0e317059-2b04-4488-98cc-4559c9ecfdac'
	})
	@IsUUID(4)
	@IsNotEmpty()
	address: string;

	@ApiProperty({
		example: ['d36f7194-57f8-43c2-91c7-56d534df7786', '77943d14-7ebb-43c1-b35b-277a8fc0b31e'],
	})
	@Transform(({ value }) => (value ? value.split(',') : []))
	@IsUUID(4, { each: true })
	@ArrayMinSize(1)
	rentingPolicies: string[];

	@ApiProperty({
		type: [CreatePricingPolicyDto],
		format: 'object',
	})
	@Transform(({ value }) => (JSON.parse(`[${value}]`)))
	@ArrayMinSize(1)
	pricingPolicies: CreatePricingPolicyDto[];

	@ApiProperty({
		example: ['Tag 1', 'Tag 2'],
	})
	@Transform(({ value }) => (value ? value.split(',') : []))
	@ArrayMinSize(1)
	tags: string[];

	@ApiProperty({
		required: false,
	})
	family?: string;

	// category;

	@ApiProperty({
		type: 'file',
		isArray: true
	})
	imageUrls: Express.Multer.File[];

	@ApiProperty({
		example: 10,
	})
	totalQuantity: number;
}