import { Module } from '@nestjs/common';

import { AuthModule } from './auth';
import { UserModule } from './user';
import { GlobalModule } from './global';
import { AddressModule } from './address';
import { RentingPolicyModule } from './renting-policy';
import { ProductModule } from './product';
import { ResourceModule } from './resource';

import { MessagesModule } from './messages/messages.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './request/request.service';
import { RequestController } from './request/request.controller';
import { RequestModule } from './request/request.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		GlobalModule,
		MessagesModule,
		AddressModule,
		RentingPolicyModule,
		ProductModule,
		ResourceModule,
		RequestModule
	],
	controllers: [AppController, RequestController],
	providers: [AppService, RequestService],
})
export class AppModule {}
