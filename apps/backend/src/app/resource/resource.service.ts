import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Buckets } from '@rentigo/constants';
import { Resource } from '@rentigo/models';
import { StorageService } from '../storage/storage.service';
import { ResourceRepository } from './resource.repository';

@Injectable()
export class ResourceService {
	constructor(
		private readonly resourceRepository: ResourceRepository,
		private readonly storageService: StorageService,
	) {}

	async create(file: Express.Multer.File) {
		const id = randomUUID();
		const name = `${id}-${file.originalname}`;

		await this.storageService.putObjectFromBuffer(
			Buckets.PRODUCT_IMAGES,
			name,
			file.buffer,
		);
		const resource: Resource = {
			id,
			bucket: Buckets.PRODUCT_IMAGES,
			name,
			size: file.size,
			mimeType: file.mimetype,
			url: '',
		};
		return this.resourceRepository.save(resource);
	}

	async findOne(id: string) {
		const resource = await this.resourceRepository.findOneBy({ id });
		return resource;
	}

	findAll() {
		return this.resourceRepository.find();
	}

	async remove(id: string) {
		const resource = await this.findOne(id);
		await this.storageService.removeObject(resource.bucket, resource.name);
		return this.resourceRepository.removeOneBy({ id });
	}
}
