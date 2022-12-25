import { ApiProperty } from '@nestjs/swagger';
import { Duration } from '@rentigo/models';
import { IsNumber, Max, Min } from 'class-validator';

export class CreatePricingPolicyDto {
	@ApiProperty({
		example: {
			unit: 'DAY',
			length: 1,
		}
	})
	duration: Duration;

	@ApiProperty({
		example: 1000,
	})
	@IsNumber()
	@Min(100)
	@Max(10000)
	price: number;
}
