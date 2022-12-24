import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Address } from '@rentigo/models';
import { Repository } from '../common/repository';

@Injectable()
export class AddressRepository extends Repository<Address> {
	constructor(dataSource: DataSource) {
		super(Address, dataSource);
	}
}
