/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';

import { Product } from './Product';

@Entity()
class Tag {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@Length(3, 50)
	name: string;

	@ManyToOne(() => Product, (product) => product.tags)
	product: Product;
}

export { Tag };
