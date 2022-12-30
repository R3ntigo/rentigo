// eslint-disable-next-line max-classes-per-file
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
	Resource,
	UserCredential,
	Review,
	Search,
	Registration
} from '@rentigo/models';
import { DataSource, AdvancedConsoleLogger } from 'typeorm';

// will not log queries that is longer than 500 characters
class CustomMigrationLogger extends AdvancedConsoleLogger {
	logQuery(query: string, parameters?: any[], queryRunner?: any) {
		if (query.length < 500) super.logQuery(query, parameters, queryRunner);
	}
}

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private config: ConfigService) {}

	readonly entities = [Address, Product, Request, User, PricingPolicy,
		RentingPolicy, Tag, Resource, UserCredential, Review, Search, Registration];

	public createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: this.config.get('POSTGRES_DB_HOST'),
			port: this.config.get('POSTGRES_DB_PORT'),
			database: this.config.get('POSTGRES_DB_NAME'),
			username: this.config.get('POSTGRES_DB_USER'),
			password: this.config.get('POSTGRES_DB_PASSWORD'),
			entities: this.entities,
			migrationsTableName: 'typeorm_migrations',
			synchronize: false,
			logging: true,
			logger: 'advanced-console',
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
			entities: this.entities,
			migrations: ['apps/backend/migrations/*.{ts,js}'],
			migrationsTableName: 'typeorm_migrations',
			logging: true,
			logger: new CustomMigrationLogger(),
		});
	}
}

export { TypeOrmConfigService };
