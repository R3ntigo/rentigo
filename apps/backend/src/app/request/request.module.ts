import { Module } from '@nestjs/common';

import { AddressModule } from '../address';
import { ProductModule } from '../product';
import { UserModule } from '../user';

import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { RequestRepository } from './request.repository';

@Module({
	imports: [
		AddressModule,
		ProductModule,
		UserModule,
	],
	controllers: [RequestController],
	providers: [RequestService, RequestRepository]
})

export class RequestModule {}
