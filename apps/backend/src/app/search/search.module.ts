import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProductModule, ProductRepository } from '../product';

@Module({
	imports: [
		ProductModule,
	],
	controllers: [SearchController],
	providers: [SearchService, ProductRepository]
})
export class SearchModule {}
