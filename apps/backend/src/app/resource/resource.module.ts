import { Module } from '@nestjs/common';

import { StorageModule } from '../storage';

import { ResourceRepository } from './resource.repository';
import { ResourceService } from './resource.service';

@Module({
	imports: [StorageModule],
	providers: [ResourceService, ResourceRepository],
	exports: [ResourceService],
})
export class ResourceModule {}
