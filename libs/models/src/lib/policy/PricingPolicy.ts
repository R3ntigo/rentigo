import { Duration } from '@rentigo/types';
import { IsNumber } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
class PricingPolicy extends Duration {
	@Column()
	@IsNumber()
	price: number;
}

export { PricingPolicy };
