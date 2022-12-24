/* eslint-disable import/no-cycle */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Address {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	division:string;

	@Column()
	district:string;

	@Column()
	subDistrict:string;

	zipCode: string;

	@Column()
	details: string;

	@Column()
	label: string;
}

export { Address };
