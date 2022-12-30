import { ApiProperty } from '@nestjs/swagger';

export class VerifyPhotoDto {
	@ApiProperty({
		type: 'file',
		isArray: true
	})
	imageUrls: any[];

	@ApiProperty({
		format: 'object',
	})
	id: string;
}
