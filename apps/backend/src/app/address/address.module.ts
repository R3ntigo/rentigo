import { Module } from '@nestjs/common';

import { UserModule } from '../user';

import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressRepository } from './address.repository';

@Module({
	imports: [
		UserModule
	],
	controllers: [AddressController],
	providers: [AddressService, AddressRepository],
	exports: [AddressService, AddressRepository]
})
export class AddressModule {}
