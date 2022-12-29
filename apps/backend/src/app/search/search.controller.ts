import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqUser } from '@rentigo/decorators';

import { SearchDto } from '@rentigo/dto';
import { Product, User } from '@rentigo/models';

import { SearchService } from './search.service';

import { JwtAuthGuard } from '../auth';


@ApiTags('Search')
@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Post()
	Search(@Body() searchDto: SearchDto, @ReqUser() user: User): Promise<Product[]> {
		return this.searchService.search(searchDto, user);
	}
}
