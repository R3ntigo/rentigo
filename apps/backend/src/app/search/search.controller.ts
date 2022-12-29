import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// import { SearchDto } from '@rentigo/dto';
// import { Search } from '@rentigo/models';

import { SearchService } from './search.service';

import { JwtAuthGuard } from '../auth';

@ApiTags('Search')
@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	// @Post()
	// Search(): Promise<Search> {
	// 	return this.searchService.search();
	// }
}
