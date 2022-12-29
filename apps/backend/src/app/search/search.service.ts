import { Injectable } from '@nestjs/common';
import { SearchDto } from '@rentigo/dto';
import { Product } from '@rentigo/models';
import { ProductService, ProductRepository } from '../product';

@Injectable()
export class SearchService {
	constructor(
		private readonly productRepository: ProductRepository,
		private readonly productService: ProductService,
	) {}

	async search(searchDto: SearchDto): Promise<Product[]> {
		const searchQuery = searchDto.searchText;
		const query = this.productRepository.createQueryBuilder().select()
			.orderBy(`SIMILARITY(title, '${searchQuery}')`, 'DESC');
		const result = await query.limit(20).getMany();
		return result;
	}
}
