/* eslint-disable import/no-cycle */
import { IsNumber, Length } from 'class-validator';
import { Column, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Address } from './Address';
import { PricingPolicy } from './policy/PricingPolicy';
import { RentingPolicy } from './policy/RentingPolicy';
import { User } from './User';

class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@Length(50, 500)
	description: string;

	@Column()
	@Length(3, 50)
	title: string;

	@ManyToOne(() => User, (user) => user.products)
	@JoinColumn()
	lender: User;

	@OneToOne(() => Address)
	address: Address;

	@Column()
	rentingPolicies: RentingPolicy[];

	@Column()
	pricingPolicies: PricingPolicy[];

	@Column()
	tags: string[];

	@Column()
	family: string;

	// category;

	@Column()
	imageUrls: string[];

	@Column()
	@IsNumber()
	totalQuantity: number;

	@Column()
	@IsNumber()
	availableQuantity: number;
}

export { Product };
