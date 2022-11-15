/* eslint-disable import/no-cycle */
import { Length, Max, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Address {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	division:string;

	@Column()
	district:string;

	@Column()
	subDistrict:string;

	@Min(1000)
	@Max(9999)
	zipCode: string;

	@Column()
	@Length(10, 100)
	details: string;

	@Column()
	@Length(3, 20)
	label: string;
}

export { Address };
