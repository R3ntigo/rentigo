import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { VerifyNidDto, VerifyPhotoDto } from '@rentigo/dto';
import { RegisterService } from './register.service';

@ApiTags('Register')
@Controller('register')
export class RegisterController {
	constructor(private readonly registerService: RegisterService) {

	}

	@Post('verify-nid')
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

	@Post('verify-photo')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FilesInterceptor('imageUrls', 100))
	async verifyPhoto(
	@Body() verifyPhotoDto: VerifyPhotoDto,
		@UploadedFiles() files: Express.Multer.File[]
	) {
		const verifyPhotoDtoWithImageUrls = {
			...verifyPhotoDto,
			imageUrls: files
		};
		return this.registerService.verifyPhoto(verifyPhotoDtoWithImageUrls);
	}

	@Get('verify-personal-info/:id')
	async verifyPersonalInfo(@Param('id') id: string) {
		return this.registerService.verifyPersonalInfo(id);
	}

	@Post('confirm-email/:id')
	async confirmEmail(@Param('id') id: string, @Body('email') email: string) {
		return this.registerService.confirmEmail(id, email);
	}

	@Get('verify-email/:id')
	async verifyEmail(@Param('id') id: string) {
		return this.registerService.verifyEmail(id);
	}

	@Post('verify-password/:id')
	async verifyPassowrd(@Param('id') id: string, @Body('password') password: string) {
		return this.registerService.verifyPassword(id, password);
	}
}
