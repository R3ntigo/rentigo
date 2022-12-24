/* eslint-disable import/no-cycle */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class Resource {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	name: string;

	@Column()
	url: string;

	@Column()
	size: number;

	@Column()
	mimeType: string;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}

export { Resource };
