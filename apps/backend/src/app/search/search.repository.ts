import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Search } from '@rentigo/models';

import { Repository } from '../common';

@Injectable()
export class SearchRepository extends Repository<Search> {
	constructor(dataSource: DataSource) {
		super(Search, dataSource);
	}
}
