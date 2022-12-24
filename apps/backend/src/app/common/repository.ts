import { DataSource, Repository as TypeormRepository, EntityTarget, FindOptionsWhere } from 'typeorm';

class Repository<T> extends TypeormRepository<T> {
	constructor(model: EntityTarget<T>,dataSource: DataSource) {
		super(model, dataSource.createEntityManager());
	}

	async removeOneBy(where: FindOptionsWhere<T>): Promise<T> {
		return this.remove(await this.findOneBy(where));
	}
}

export { Repository };
