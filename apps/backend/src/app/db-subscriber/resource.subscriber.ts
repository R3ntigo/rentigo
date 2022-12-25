/* eslint-disable no-param-reassign */
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Resource } from '@rentigo/models';
import { StorageService } from '../storage/storage.service';

@Injectable()
@EventSubscriber()
export class ResourceSubscriber implements EntitySubscriberInterface<Resource> {
	constructor(
		private readonly dataSource: DataSource,
		private readonly storageService: StorageService,
	) {
		this.dataSource.subscribers.push(this);
	}

	// eslint-disable-next-line class-methods-use-this
	listenTo() {
		return Resource;
	}

	async beforeInsert(event: InsertEvent<Resource>) {
		const resource = await this.generateUrl(event.entity);
		event.entity.url = resource.url;
		event.entity.urlExpires = resource.urlExpires;
	}

	async afterLoad(entity: Resource): Promise<Resource> {
		const resource = await this.generateUrl(entity);
		return resource;
	}

	private async generateUrl(resource: Resource) {
		if (resource.url !== '' && !(resource.urlExpires && resource.urlExpires > new Date())) {
			return resource;
		}

		const urlWithExpiration = await this.storageService.getObjectUrl(resource.bucket, resource.name);
		const updatedResource = {
			...resource,
			url: urlWithExpiration.url,
			urlExpires: urlWithExpiration.expires,
		};
		return updatedResource;
	}
}
