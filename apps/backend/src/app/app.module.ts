import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		GlobalModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
