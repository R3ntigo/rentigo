import { DataSource, Repository } from 'typeorm';
import { User } from '@rentigo/models';
import { Injectable } from '@nestjs/common';

@Injectable()
class UserRepository extends Repository<User> {
	constructor(dataSource: DataSource) {
		super(User, dataSource.createEntityManager());
	}

	async findByEmail(email: string): Promise<User> {
		return this.findOne({ where: {
			email
		} });
	}
}

export { UserRepository };
