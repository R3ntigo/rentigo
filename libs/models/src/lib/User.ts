/* eslint-disable import/no-cycle */
import { Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn } from 'typeorm';
import { IsArray, IsEmail, IsPhoneNumber, Max, Min } from 'class-validator';
import { Gender } from '@rentigo/types';

import { Address } from './Address';
import { Request } from './Request';
import { Product } from './Product';
import { RentingPolicy } from './policy';
import { Resource } from './Resource';

@Entity()
class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@Min(3)
	@Max(50)
	firstName: string;

	@Column()
	@Min(3)
	@Max(50)
	lastName: string;

	@Column()
	@IsEmail()
	email: string;

	@Column()
	@IsPhoneNumber('BD')
	phone: string;

	@OneToOne(() => Resource)
	@JoinColumn()
	photoUrl: Resource;

	@Column()
	nid: string;

	@Column({
		type: 'enum',
		enum: Gender,
	})
	gender: Gender;

	@ManyToMany(() => Address, { cascade: true })
	@JoinTable({
		name: 'user_address',
	})
	@IsArray()
	address: Address[];

	@OneToMany(() => Request, (request) => request.id, { cascade: true })
	requests: Request[];

	@OneToMany(() => Product, (product) => product.id, { cascade: true })
	products: Product[];

	@OneToMany(() => RentingPolicy, (rentingPolicy) => rentingPolicy.id, { cascade: true })
	rentingPolicies: RentingPolicy[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}

export { User };
