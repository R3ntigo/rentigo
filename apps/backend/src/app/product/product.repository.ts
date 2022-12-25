import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Product } from '@rentigo/models';

import { Repository } from '../common';

@Injectable()
export class ProductRepository extends Repository<Product> {
	constructor(dataSource: DataSource) {
		super(Product, dataSource);
	}
}
