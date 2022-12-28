/* eslint-disable import/no-cycle */
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

import { User } from './internal';

@Entity()
export class Review {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ManyToOne(() => User, (user) => user.providedReviews)
	@JoinColumn()
	reviewer: User;

	@Column()
	reviewText:string;

	@Column()
	rating:number;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
