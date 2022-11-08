/* eslint-disable import/no-cycle */
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber } from 'class-validator';

import { Duration } from '../Duration';
import { Product } from '../Product';

@Entity()
class PricingPolicy {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => Duration)
	@JoinColumn()
	duration: Duration;

	@Column()
	@IsNumber()
	price: number;

	@ManyToOne(() => Product, (product) => product.pricingPolicies)
	@JoinColumn()
	product: Product;
}

export { PricingPolicy };
