import { Module } from '@nestjs/common';

import { AddressModule } from '../address';
import { RentingPolicyModule } from '../renting-policy';
import { ResourceModule } from '../resource';
import { UserModule } from '../user';
import { ReviewModule } from '../review';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';

@Module({
	imports: [
		AddressModule,
		RentingPolicyModule,
		ResourceModule,
		UserModule,
		ReviewModule
	],
	controllers: [ProductController],
	providers: [ProductService, ProductRepository],
	exports: [ProductService]
})
export class ProductModule {}
