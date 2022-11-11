import { TimeUnit } from '@rentigo/types';
import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Duration {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: 'enum',
		enum: TimeUnit,
	})
	unit: TimeUnit;

	@Column()
	@IsNumber()
	duration: number;
}

export { Duration };
