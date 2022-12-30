import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class SearchDto {
	@ApiProperty()
	@IsNotEmpty()
	@MaxLength(100)
	searchText: string;
}
