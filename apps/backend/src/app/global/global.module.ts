import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from '../config/typeorm.config';
import { StorageModule } from '../storage/storage.module';

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
		StorageModule
	],
	exports: [
		configModule,
		typeOrmModule,
		StorageModule
	]
})
export class GlobalModule {}
