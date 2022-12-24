import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global.module';
import { MessagesModule } from './messages/messages.module';
import { AddressModule } from './address/address.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		GlobalModule,
		MessagesModule,
		AddressModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
