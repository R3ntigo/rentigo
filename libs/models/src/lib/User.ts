/* eslint-disable import/no-cycle */
import { Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn } from 'typeorm';
import { IsArray, IsEmail, IsPhoneNumber, IsUrl, Max, Min } from 'class-validator';
import { Gender } from '@rentigo/types';

import { Address } from './Address';
import { Request } from './Request';
import { Product } from './Product';
import { RentingPolicy } from './policy';
import { Resource } from './Resource';
import { UserCredential } from './UserCredential';

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
	@Index({ unique: true })
	@IsEmail()
	email: string;

	@Column({
		unique: true,
	})
	@IsPhoneNumber('BD')
	phone: string;

	@OneToOne(() => Resource)
	@JoinColumn()
	@IsUrl()
	photoUrl: Resource;

	@Column({
		unique: true,
	})
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
	@IsArray()
	requests: Request[];

	@OneToMany(() => Product, (product) => product.id, { cascade: true })
	@IsArray()
	products: Product[];

	@OneToMany(() => RentingPolicy, (rentingPolicy) => rentingPolicy.id, { cascade: true })
	@IsArray()
	rentingPolicies: RentingPolicy[];

	@OneToOne(() => UserCredential, { cascade: true })
	@JoinColumn({
		name: 'credentialId',
	})
	credential: UserCredential;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}

export { User };
