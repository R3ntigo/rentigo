import { Injectable } from '@nestjs/common';
import { Registration } from '@rentigo/models';
import { DataSource } from 'typeorm';
import { Repository } from '../common';

@Injectable()
export class RegistrationRepository extends Repository<Registration> {
	constructor(dataSource: DataSource) {
		super(Registration, dataSource);
	}
}
