import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RentingPolicy } from '@rentigo/models';
import { Repository } from '../common/repository';

@Injectable()
export class RentingPolicyRepository extends Repository<RentingPolicy> {
	constructor(dataSource: DataSource) {
		super(RentingPolicy, dataSource);
	}
}
