import { Module } from '@nestjs/common';

import { UsersModule } from '../user';

import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressRepository } from './address.repository';

@Module({
	imports: [
		UsersModule
	],
	controllers: [AddressController],
	providers: [AddressService, AddressRepository],
	exports: [AddressService, AddressRepository]
})
export class AddressModule {}
