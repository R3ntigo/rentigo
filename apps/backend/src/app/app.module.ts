import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global.module';
import { ChatSystemService } from './chat-system/chat-system.service';
import { ChatSystemModule } from './chat-system/chat-system.module';
import { MessagesModule } from './messages/messages.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		GlobalModule,
		ChatSystemModule,
		MessagesModule
	],
	controllers: [AppController],
	providers: [AppService, ChatSystemService],
})
export class AppModule {}
