import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

export class UpdateRentingPolicyDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID(4)
	id: string;

	@ApiProperty({
		example: 'Renting Policy Title',
	})
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(255)
	title?:string;

	@ApiProperty({
		example: 'Renting Policy Short Description',
	})
	@IsNotEmpty()
	@MinLength(10)
	@MaxLength(512)
	shortDescription?: string;

	@ApiProperty({
		example: `
			lorem ipsum dolor sit amet,
			consectetur adipiscing e
			lit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
			Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
			mollit anim id est laborum.
		`,
	})
	@IsNotEmpty()
	@MinLength(100)
	@MaxLength(32768)
	legalDescription?: string;
}
