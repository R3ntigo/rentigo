import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
	Address,
	Product,
	Request,
	User,
	PricingPolicy,
	RentingPolicy,
	Tag,
	Resource
} from '@rentigo/models';
import { DataSource } from 'typeorm';

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private config: ConfigService) {}

	public createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: this.config.get('POSTGRES_DB_HOST'),
			port: this.config.get('POSTGRES_DB_PORT'),
			database: this.config.get('POSTGRES_DB_NAME'),
			username: this.config.get('POSTGRES_DB_USER'),
			password: this.config.get('POSTGRES_DB_PASSWORD'),
			entities: [Address, Product, Request, User, PricingPolicy, RentingPolicy, Tag, Resource],
			migrationsTableName: 'typeorm_migrations',
			synchronize: false,
			logging: true,
		};
	}

	public createDataSource(): DataSource {
		return new DataSource({
			type: 'postgres',
			host: this.config.get('POSTGRES_DB_HOST'),
			port: this.config.get('POSTGRES_DB_PORT'),
			database: this.config.get('POSTGRES_DB_NAME'),
			username: this.config.get('POSTGRES_DB_USER'),
			password: this.config.get('POSTGRES_DB_PASSWORD'),
			entities: [Address, Product, Request, User, PricingPolicy, RentingPolicy, Tag, Resource],
			migrations: ['apps/backend/migrations/*.{ts,js}'],
			migrationsTableName: 'typeorm_migrations',
			logging: true,
		});
	}
}

export { TypeOrmConfigService };