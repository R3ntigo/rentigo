import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Address } from '@rentigo/models';

import { Repository } from '../common';

@Injectable()
export class AddressRepository extends Repository<Address> {
	constructor(dataSource: DataSource) {
		super(Address, dataSource);
	}
}
