import { Injectable } from '@nestjs/common';
import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';

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
}

export { StorageService };
