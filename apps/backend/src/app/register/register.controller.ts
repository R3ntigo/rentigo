import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TextResult } from 'dynamsoft-javascript-barcode';

import { RegisterService } from './register.service';

@ApiTags('Register')
@Controller('register')
export class RegisterController {
	constructor(private readonly registerService: RegisterService) {

	}

	@Post('verify-nid')
	async verifyNIDPhoto(@Body('textResult') textResult: TextResult) {
		return this.registerService.verifyNID(textResult.barcodeText);
	}
}
