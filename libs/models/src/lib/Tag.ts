/* eslint-disable import/no-cycle */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './Product';

@Entity()
class Tag {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	name: string;

	@ManyToOne(() => Product, (product) => product.tags)
	@JoinColumn()
	product?: Product;
}

export { Tag };
