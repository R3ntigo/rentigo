import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SearchDto } from '@rentigo/dto';
import { Product } from '@rentigo/models';

import { SearchService } from './search.service';

import { JwtAuthGuard } from '../auth';

@ApiTags('Search')
@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Post()
	Search(@Body() searchDto: SearchDto): Promise<Product[]> {
		return this.searchService.search(searchDto);
	}
}
