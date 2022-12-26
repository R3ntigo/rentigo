import 'multer';
import { IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Duration } from '@rentigo/models';

export class CreateRequestDto {
	@ApiProperty({
		example: 'a9719730-95e5-40b0-aadb-92a49da1a497',
	})
	@IsUUID(4)
	product: string;

	@ApiProperty({
		example: 1,
	})
	@Min(1)
	quantity: number;

	@ApiProperty({
		example: '935763b0-b064-423c-851d-cb6c9ee67974',
	})
	@IsUUID(4)
	address: string;

	@ApiProperty({
		example: {
			unit: 'DAY',
			length: 1,
		}
	})
	duration: Duration;
}
