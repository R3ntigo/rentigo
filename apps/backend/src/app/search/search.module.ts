import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProductModule, ProductRepository } from '../product';
import { UserModule } from '../user';
import { SearchRepository } from './search.repository';

@Module({
	imports: [
		ProductModule,
		UserModule
	],
	controllers: [SearchController],
	providers: [SearchService, SearchRepository, ProductRepository]
})
export class SearchModule {}
