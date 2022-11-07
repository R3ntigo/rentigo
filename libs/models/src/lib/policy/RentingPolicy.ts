import { Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../User';

@Entity()
class RentingPolicy {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	user: User;

	@Column()
	title:string;

	@Column()
	@Length(10, 100)
	shortDescription: string;

	@Column()
	@Length(10, 1000)
	legalDescription: string;

	lastUpdated: string;
}

export { RentingPolicy };
