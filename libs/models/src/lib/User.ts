/* eslint-disable import/no-cycle */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsPhoneNumber, IsUrl, Max, Min } from 'class-validator';
import { Gender } from '@rentigo/types';

import { Address } from './Address';
import { Request } from './Request';
import { Product } from './Product';

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
	@IsEmail()
	email: string;

	@Column()
	@IsPhoneNumber('BD')
	phone: string;

	@Column()
	@IsUrl()
	photoUrl: string;

	@Column()
	nid: string;

	@Column({
		type: 'enum',
		enum: Gender,
	})
	gender: Gender;

	@OneToMany(() => Address, (address) => address.user, { cascade: true })
	address: Address[];

	@OneToMany(() => Request, (request) => request.id, { cascade: true })
	requests: Request[];

	@OneToMany(() => Product, (product) => product.id, { cascade: true })
	products: Product;
}

export { User };
