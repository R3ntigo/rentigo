import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
	Address,
	Product,
	Request,
	User,
	PricingPolicy,
	RentingPolicy,
	Duration,
	Tag,
	Resource
} from '@rentigo/models';

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {
	public createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: this.config.get('POSTGRES_DB_HOST'),
			port: this.config.get('POSTGRES_DB_PORT'),
			database: this.config.get('POSTGRES_DB_NAME'),
			username: this.config.get('POSTGRES_DB_USER'),
			password: this.config.get('POSTGRES_DB_PASSWORD'),
			entities: [Address, Product, Request, User, PricingPolicy, RentingPolicy, Duration, Tag, Resource],
			migrations: ['apps/backend/migrations/*.{ts,js}'],
			migrationsTableName: 'typeorm_migrations',
			synchronize: true,
		};
	}

  @Inject(ConfigService)
  private readonly config: ConfigService;
}

export { TypeOrmConfigService };
