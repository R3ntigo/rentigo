import { DataSource, FindOptionsRelations } from 'typeorm';
import { User } from '@rentigo/models';
import { Injectable } from '@nestjs/common';
import { Repository } from '../common/repository';

@Injectable()
class UserRepository extends Repository<User> {
	constructor(dataSource: DataSource) {
		super(User, dataSource);
	}

	async findByEmail(email: string, relations: FindOptionsRelations<User>): Promise<User> {
		const user = await this.findOne({ where: { email }, relations });
		return user;
	}
}

export { UserRepository };
