/* eslint-disable import/no-cycle */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './internal';

@Entity()
export class Tag {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	name: string;

	@ManyToOne(() => Product, (product) => product.tags, {
		onDelete: 'CASCADE',
		orphanedRowAction: 'delete',
	})
	@JoinColumn()
	product?: Product;
}
