import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateReviewDto {
	@ApiProperty()
	@IsNotEmpty()
    @MaxLength(400)
	reviewText:string;

	@ApiProperty()
    @IsNotEmpty()
    @Min(0)
    @Max(5)
	rating:number;
}
