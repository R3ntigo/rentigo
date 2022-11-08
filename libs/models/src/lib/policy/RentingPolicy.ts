/* eslint-disable import/no-cycle */
import { IsDate, Length } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '../Product';
import { User } from '../User';

@Entity()
class RentingPolicy {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => User, (user) => user.rentingPolicies)
	@JoinColumn()
	user: User;

	@Column()
	title:string;

	@Column()
	@Length(10, 100)
	shortDescription: string;

	@Column()
	@Length(10, 1000)
	legalDescription: string;

	@Column()
	@IsDate()
	lastUpdated: Date;

	@ManyToOne(() => Product, (product) => product.rentingPolicies)
	@JoinColumn()
	product: Product;
}

export { RentingPolicy };
