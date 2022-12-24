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
import { Duration } from './Duration';

import { Address } from './Address';
import { Product } from './Product';
import { User } from './User';

@Entity()
class Request {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ManyToOne(() => User, (user) => user.requests)
	@JoinColumn()
	borrower: User;

	@ManyToOne(() => Product)
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

export { Request, RequestStatus };
