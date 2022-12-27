/* eslint-disable import/no-cycle */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Duration, Product } from './internal';

@Entity()
export class PricingPolicy {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column(() => Duration)
	duration: Duration;

	@Column()
	price: number;

	@ManyToOne(() => Product, (product) => product.pricingPolicies)
	@JoinColumn()
	product?: Product;
}
