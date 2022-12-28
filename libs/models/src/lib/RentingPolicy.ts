/* eslint-disable import/no-cycle */
import { Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn } from 'typeorm';

import { User } from './internal';

@Entity()
export class RentingPolicy {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ManyToOne(() => User, (user) => user.rentingPolicies, { eager: true })
	@JoinColumn()
	user: User;

	@Column()
	title:string;

	@Column()
	shortDescription: string;

	@Column()
	legalDescription: string;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
