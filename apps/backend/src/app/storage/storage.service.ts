import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { addSeconds } from 'date-fns';

@Injectable()
class StorageService {
	private client: Client;

	constructor(config: ConfigService) {
		this.client = new Client({
			endPoint: 'localhost',
			port: 9000,
			useSSL: false,
			accessKey: config.get('MINIO_ROOT_USER'),
			secretKey: config.get('MINIO_ROOT_PASSWORD')
		});
	}

	listBuckets() {
		return this.client.listBuckets();
	}

	getObject(bucket: string, object: string) {
		return this.client.getObject(bucket, object);
	}

	putObjectFromBuffer(bucket: string, object: string, buffer: Buffer) {
		return this.client.putObject(bucket, object, buffer);
	}

	async getObjectUrl(bucket: string, object: string, expires: number = 60 * 60 * 24 * 7) {
		const url = await this.client.presignedGetObject(bucket, object, expires);
		return {
			url,
			expires: addSeconds(new Date(), expires)
		};
	}

	removeObject(bucket: string, object: string) {
		return this.client.removeObject(bucket, object);
	}
}

export { StorageService };
