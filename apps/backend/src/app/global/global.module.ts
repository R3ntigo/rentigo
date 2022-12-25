import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from '../config';
import { DbSubscriberModule } from '../db-subscriber';
import { StorageModule } from '../storage';

const configModule = ConfigModule.forRoot({
	isGlobal: true,
});

const typeOrmModule = TypeOrmModule.forRootAsync({
	inject: [configModule],
	useClass: TypeOrmConfigService,
});

@Global()
@Module({
	imports: [
		configModule,
		typeOrmModule,
		StorageModule,
		DbSubscriberModule,
	],
	exports: [
		configModule,
		typeOrmModule,
		StorageModule,
		DbSubscriberModule,
	]
})
export class GlobalModule {}
