import { Module } from '@nestjs/common';
import { StorageModule } from '../storage/storage.module';
import { ResourceSubscriber } from './resource.subscriber';

@Module({
	imports: [StorageModule],
	providers: [ResourceSubscriber],
	exports: [ResourceSubscriber],
})
export class DbSubscriberModule {}
