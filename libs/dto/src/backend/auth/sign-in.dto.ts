import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsNotEmpty, IsEmail } from 'class-validator';

class SignInDto {
	@ApiProperty({
		example: 'Marcia_Fadel_1kb@rentigo.com',
	})
	@IsEmail()
	@IsNotEmpty()
	username: string;

	@ApiProperty({
		example: 'password',
	})
	@MinLength(8)
	@MaxLength(64)
	@IsNotEmpty()
	password: string;
}

export { SignInDto };
