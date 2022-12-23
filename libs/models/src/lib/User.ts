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

	@OneToMany(() => Request, (request) => request.id, { cascade: true })
	requests?: Request[];

	@OneToMany(() => Product, (product) => product.id, { cascade: true })
	products?: Product[];

	@OneToMany(() => RentingPolicy, (rentingPolicy) => rentingPolicy.id, { cascade: true })
	rentingPolicies?: RentingPolicy[];

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

export { User };
