import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { GlobalModule } from '../global/global.module';
import { TypeOrmConfigService } from './typeorm.config';

async function bootstrap():Promise<DataSource> {
	const app = await NestFactory.create(GlobalModule);
	const Config = app.get(ConfigService);
	const TypeOrmConfig = new TypeOrmConfigService(Config);
	const dataSource = await TypeOrmConfig.createDataSource();
	return dataSource;
}

const dataSource = bootstrap();
// eslint-disable-next-line import/no-default-export
export default dataSource;
