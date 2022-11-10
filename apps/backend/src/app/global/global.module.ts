import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from '../config/typeorm.config';
import { StorageModule } from '../storage/storage.module';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfigService,
		}),
		StorageModule
	],
	exports: [
		ConfigModule,
		TypeOrmModule,
		StorageModule
	]
})
export class GlobalModule {}
