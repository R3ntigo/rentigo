/* eslint-disable import/no-cycle */
import { Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn } from 'typeorm';
import { IsDate, Length } from 'class-validator';

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

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}

export { RentingPolicy };
