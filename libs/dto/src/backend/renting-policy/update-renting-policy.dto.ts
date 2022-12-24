import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateRentingPolicyDto } from './create-renting-policy.dto';

export class UpdateRentingPolicyDto extends PartialType(CreateRentingPolicyDto) {
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	id: string;
}
