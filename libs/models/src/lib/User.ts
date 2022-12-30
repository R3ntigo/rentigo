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
import { Gender } from '@rentigo/constants';

import { Address, Request, Product, RentingPolicy, Resource, UserCredential, Review } from './internal';
import { Search } from './Search';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	@Index({ unique: true })
	email: string;

	@Column({
		unique: true,
	})
	phone: string;

	@OneToOne(() => Resource)
	@JoinColumn()
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
	addresses?: Address[];

	@OneToMany(() => Request, (request) => request.borrower, { cascade: true })
	requests?: Request[];

	@OneToMany(() => Product, (product) => product.lender, { cascade: true })
	products?: Product[];

	@ManyToMany(() => Review)
	@JoinTable({
		name: 'user_received_reviews',
	})
	receivedReviews?: Review[];

	@OneToMany(() => Review, (review) => review.reviewer)
	@JoinColumn()
	providedReviews?: Review[];

	@OneToMany(() => Search, (search) => search)
	@JoinColumn()
	searchHistory?: Search[];

	@OneToMany(() => RentingPolicy, (rentingPolicy) => rentingPolicy.user, { cascade: true })
	rentingPolicies?: RentingPolicy[];

	// FIXME: cascade is not working
	@OneToOne(() => UserCredential, { cascade: true })
	@JoinColumn({
		name: 'credentialId',
	})
	credential?: UserCredential;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
