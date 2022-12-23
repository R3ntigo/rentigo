/* eslint-disable import/no-cycle */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Duration } from '../Duration';
import { Product } from '../Product';

@Entity()
class PricingPolicy {
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

export { PricingPolicy };
