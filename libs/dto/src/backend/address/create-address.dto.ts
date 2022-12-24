import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateAddressDto {
	@ApiProperty()
	@IsNotEmpty()
	division:string;

	@ApiProperty()
	district:string;

	@ApiProperty()
	subDistrict:string;

	@ApiProperty()
	@IsNotEmpty()
	zipCode: string;

	@ApiProperty()
	@IsNotEmpty()
	@MinLength(10)
	@MaxLength(100)
	details: string;

	@ApiProperty()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(20)
	label: string;
}
