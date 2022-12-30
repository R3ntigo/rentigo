/* eslint-disable import/no-cycle */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './internal';

@Entity()
export class Search {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	SearchText: string;

	@ManyToOne(() => User, (user) => user)
	@JoinColumn()
    searcher: User;
}
