import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Request } from '@rentigo/models';

import { Repository } from '../common';

@Injectable()
export class RequestRepository extends Repository<Request> {
	constructor(dataSource: DataSource) {
		super(Request, dataSource);
	}
}
