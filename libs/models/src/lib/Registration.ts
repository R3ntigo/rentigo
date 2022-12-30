import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Resource } from './Resource';

@Entity()
export class Registration {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	@Index({ unique: true })
	nid: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	dob: Date;

	@ManyToMany(() => Resource, {
		cascade: ['insert', 'update'],
		eager: true,
	})
	@JoinTable({
		name: 'registration_image_urls',
	})
	photoUrl?: Resource;

	@Column()
	status: string;

	@Column({ nullable: true })
	email?: string;

	@Column({ nullable: true })
	phone?: string;

	@ManyToMany(() => Resource, {
		cascade: ['insert', 'update'],
		eager: true,
	})
	@JoinTable({
		name: 'nid_image_urls',
	})
	nidImages: Resource[];

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
