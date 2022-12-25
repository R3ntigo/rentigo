/* eslint-disable import/no-cycle */
import { Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn } from 'typeorm';

import { Address } from './Address';
import { PricingPolicy } from './policy/PricingPolicy';
import { RentingPolicy } from './policy/RentingPolicy';
import { Request } from './Request';
import { Resource } from './Resource';
import { Tag } from './Tag';
import { User } from './User';

@Entity()
class Product {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	description: string;

	@Column()
	title: string;

	@ManyToOne(() => User, (user) => user.products, {
		eager: true,
	})
	@JoinColumn()
	lender: User;

	@ManyToOne(() => Address, {
		eager: true,
	})
	@JoinColumn()
	address: Address;

	@ManyToMany(() => RentingPolicy)
	@JoinTable({
		name: 'product_renting_policy',
	})
	rentingPolicies: RentingPolicy[];

	@OneToMany(() => PricingPolicy, (pricingPolicy) => pricingPolicy.product, {
		cascade: true,
		eager: true,
	})
	@JoinColumn()
	pricingPolicies: PricingPolicy[];

	@OneToMany(() => Tag, (tag) => tag.product, {
		cascade: true,
		eager: true,
		orphanedRowAction: 'delete',
	})
	@JoinColumn()
	tags: Tag[];

	@Column({
		nullable: true,
	})
	family?: string;

	// category;

	@ManyToMany(() => Resource, {
		cascade: true,
		eager: true,
	})
	@JoinTable({
		name: 'product_image_urls',
	})
	imageUrls: Resource[];

	@Column()
	totalQuantity: number;

	@Column()
	availableQuantity: number;

	@OneToMany(() => Request, (request) => request.product, { cascade: true })
	@JoinColumn()
	requests?: Request[];

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}

export { Product };
