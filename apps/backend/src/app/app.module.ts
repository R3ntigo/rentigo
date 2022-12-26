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
import { ReviewModule } from './review/review.module';

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
		ReviewModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
