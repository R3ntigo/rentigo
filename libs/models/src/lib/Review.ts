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

import { User } from './User';

@Entity()
class Review {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ManyToOne(() => User, (user) => user.providedReviews)
	@JoinColumn()
	reviewer: User;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}

export { Review };
