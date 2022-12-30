import { TextResult } from 'dynamsoft-javascript-barcode';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class VerifyNidDto {
	@ApiProperty({
		type: 'file',
		isArray: true
	})
	imageUrls: any[];

	@ApiProperty({
		format: 'object',
	})
	@Transform(({ value }) => JSON.parse(value))
	nid: TextResult;
}
