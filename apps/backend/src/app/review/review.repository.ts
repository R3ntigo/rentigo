import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Review } from '@rentigo/models';

import { Repository } from '../common';

@Injectable()
export class ReviewRepository extends Repository<Review> {
	constructor(dataSource: DataSource) {
		super(Review, dataSource);
	}
}
