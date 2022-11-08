/* eslint-disable import/no-cycle */
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber } from 'class-validator';
import { Duration } from './Duration';

import { Address } from './Address';
import { Product } from './Product';
import { User } from './User';

enum RequestStatus {
	PENDING = 'PENDING',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
}

@Entity()
class Request {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => User, (user) => user.requests)
	@JoinColumn()
	user: User;

	@OneToOne(() => Product)
	@JoinColumn()
	product: Product;

	@Column()
	@IsNumber()
	quantity: number;

	@OneToOne(() => Address)
	@JoinColumn()
	address: Address;

	@OneToOne(() => Duration)
	@JoinColumn()
	duration: Duration;

	@Column({
		type: 'enum',
		enum: RequestStatus,
		default: RequestStatus.PENDING,
	})
	status: RequestStatus;
}

export { Request, RequestStatus };
