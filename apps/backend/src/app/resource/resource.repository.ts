import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Resource } from '@rentigo/models';
import { Repository } from '../common/repository';

@Injectable()
export class ResourceRepository extends Repository<Resource> {
	constructor(dataSource: DataSource) {
		super(Resource, dataSource);
	}
}
