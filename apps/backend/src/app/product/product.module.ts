import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { AddressModule } from '../address/address.module';
import { RentingPolicyModule } from '../renting-policy/renting-policy.module';
import { ResourceModule } from '../resource/resource.module';
import { UsersModule } from '../user/user.module';

@Module({
	imports: [
		AddressModule,
		RentingPolicyModule,
		ResourceModule,
		UsersModule,
	],
	controllers: [ProductController],
	providers: [ProductService, ProductRepository]
})
export class ProductModule {}
