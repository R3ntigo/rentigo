import { TimeUnit } from '@rentigo/types';
import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

class Duration {
	@Column({
		type: 'enum',
		enum: TimeUnit,
	})
	unit: TimeUnit;

	@Column()
	@IsNumber()
	length: number;
}

export { Duration };
