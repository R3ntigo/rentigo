import { Module } from '@nestjs/common';

import { AddressModule } from '../address';
import { RentingPolicyModule } from '../renting-policy';
import { ResourceModule } from '../resource';
import { UserModule } from '../user';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';

@Module({
	imports: [
		AddressModule,
		RentingPolicyModule,
		ResourceModule,
		UserModule,
	],
	controllers: [ProductController],
	providers: [ProductService, ProductRepository]
})
export class ProductModule {}
