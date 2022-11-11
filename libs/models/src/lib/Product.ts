/* eslint-disable import/no-cycle */
import { IsArray, IsNumber, Length } from 'class-validator';
import { Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn } from 'typeorm';

import { Address } from './Address';
import { PricingPolicy } from './policy/PricingPolicy';
import { RentingPolicy } from './policy/RentingPolicy';
import { Resource } from './Resource';
import { Tag } from './Tag';
import { User } from './User';

@Entity()
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
	@JoinColumn()
	address: Address;

	@OneToMany(() => RentingPolicy, (rentingPolicy) => rentingPolicy.product, { cascade: true })
	@JoinColumn()
	@IsArray()
	rentingPolicies: RentingPolicy[];

	@OneToMany(() => PricingPolicy, (pricingPolicy) => pricingPolicy.product, { cascade: true })
	@JoinColumn()
	@IsArray()
	pricingPolicies: PricingPolicy[];

	@OneToMany(() => Tag, (tag) => tag.product, { cascade: true })
	@JoinColumn()
	tags: Tag;

	@Column()
	family: string;

	// category;

	@ManyToMany(() => Resource, { cascade: true })
	@JoinTable()
	imageUrls: Resource[];

	@Column()
	@IsNumber()
	totalQuantity: number;

	@Column()
	@IsNumber()
	availableQuantity: number;
}

export { Product };
