import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { VerifyNidDto } from '@rentigo/dto';

import { TextResult } from 'dynamsoft-javascript-barcode';

import { RegisterService } from './register.service';

@ApiTags('Register')
@Controller('register')
export class RegisterController {
	constructor(private readonly registerService: RegisterService) {

	}

	@Post()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FilesInterceptor('imageUrls', 100))
	async verifyNid(
	@Body() verifyNidDto: VerifyNidDto,
		@UploadedFiles() files: Express.Multer.File[]
	) {
		const verifyNidDtoWithImageUrls = {
			...verifyNidDto,
			imageUrls: files
		};
		return this.registerService.verifyNID(verifyNidDtoWithImageUrls);
	}
}
