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
import { RequestStatus } from '@rentigo/constants';

import { Duration, Address, Product, User } from './internal';

@Entity()
export class Request {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ManyToOne(() => User, (user) => user.requests, {
		eager: true,
	})
	@JoinColumn()
	borrower: User;

	@ManyToOne(() => Product, {
		eager: true,
	})
	@JoinColumn()
	product: Product;

	@Column()
	quantity: number;

	@ManyToOne(() => Address)
	@JoinColumn()
	address: Address;

	@Column(() => Duration)
	duration: Duration;

	@Column({
		type: 'enum',
		enum: RequestStatus,
		default: RequestStatus.PENDING,
	})
	status: RequestStatus;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
