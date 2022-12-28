import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Max, MaxLength, Min } from 'class-validator';

export class UpdateReviewDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID(4)
	id: string;

	@ApiProperty()
	@IsNotEmpty()
	@MaxLength(400)
	reviewText?:string;

	@ApiProperty()
	@IsNotEmpty()
	@Min(0)
	@Max(5)
	rating?:number;
}
