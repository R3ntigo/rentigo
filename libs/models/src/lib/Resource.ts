/* eslint-disable import/no-cycle */
import { IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export { Resource };
