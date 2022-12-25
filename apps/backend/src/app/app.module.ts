import { Module } from '@nestjs/common';

import { AuthModule } from './auth';
import { UsersModule } from './user';
import { GlobalModule } from './global';
import { AddressModule } from './address';
import { RentingPolicyModule } from './renting-policy';
import { ProductModule } from './product';
import { ResourceModule } from './resource';

import { MessagesModule } from './messages/messages.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		GlobalModule,
		MessagesModule,
		AddressModule,
		RentingPolicyModule,
		ProductModule,
		ResourceModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
