import { Injectable } from '@nestjs/common';
import { SearchDto } from '@rentigo/dto';
import { Product, User } from '@rentigo/models';
import { ProductService, ProductRepository } from '../product';
import { SearchRepository } from './search.repository';

@Injectable()
export class SearchService {
	constructor(
		private readonly productRepository: ProductRepository,
		private readonly productService: ProductService,
		private readonly searchRepository: SearchRepository,
	) {}

	async search(searchDto: SearchDto, user: User): Promise<Product[]> {
		const searchQuery = searchDto.searchText;
		const searchProduct = {
			SearchText: searchQuery,
			searcher: user
		};
		this.searchRepository.save(searchProduct);
		const query = this.productRepository.createQueryBuilder().select()
			.orderBy(`SIMILARITY(title, '${searchQuery}')`, 'DESC');
		const result = await query.limit(20).getMany();
		return result;
	}

    // async filter()
}
