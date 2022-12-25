import {
	Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity()
class Resource {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({
		nullable: true,
	})
	bucket?: string;

	@Column()
	name: string;

	@Column()
	url: string;

	@Column({
		nullable: true,
	})
	urlExpires?: Date;

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
