import { TimeUnit } from '@rentigo/constants';
import { IsNumber } from 'class-validator';
import { Column } from 'typeorm';

export class Duration {
	@Column({
		type: 'enum',
		enum: TimeUnit,
	})
	unit: TimeUnit;

	@Column()
	@IsNumber()
	length: number;
}
