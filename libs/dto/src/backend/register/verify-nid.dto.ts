import { ApiProperty } from '@nestjs/swagger';
import { TextResult } from 'dynamsoft-javascript-barcode';

export class VerifyNidDto {
	@ApiProperty({
		type: 'file',
		isArray: true
	})
	imageUrls: any[];

	@ApiProperty({
		format: 'object',
	})
	nid: TextResult;
}
