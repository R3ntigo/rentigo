/* eslint-disable import/no-cycle */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNumber, IsString, IsUrl, Length } from 'class-validator';

@Entity()
class Resource {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@IsString()
	@Length(3, 50)
	name: string;

	@Column()
	@IsUrl()
	url: string;

	@Column()
	@IsNumber()
	size: number;

	@Column()
	@IsString()
	@Length(3, 50)
	mimeType: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}

export { Resource };
