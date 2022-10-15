import { MinLength, MaxLength, IsNotEmpty } from 'class-validator';

class SignInDto {
	@MinLength(4)
	@MaxLength(16)
	@IsNotEmpty()
	username: string;

	@MinLength(8)
	@MaxLength(64)
	@IsNotEmpty()
	password: string;

	constructor(username: string, password: string) {
		this.username = username;
		this.password = password;
	}
}

export { SignInDto };
