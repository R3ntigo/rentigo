import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressRepository } from './address.repository';
import { UsersModule } from '../user/user.module';

@Module({
	imports: [
		UsersModule
	],
	controllers: [AddressController],
	providers: [AddressService, AddressRepository],
	exports: [AddressService, AddressRepository]
})
export class AddressModule {}
