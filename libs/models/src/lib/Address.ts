import { Length, Max, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { User } from './User';

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

	@ManyToOne(() => User, (user) => user.address)
	user: User;
}

export { Address };
