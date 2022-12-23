import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from 'typeorm';
import { hashSync } from 'bcryptjs';

@Entity()
class UserCredential {
	@PrimaryColumn({
		type: 'uuid',
	})
	userId: string;

	@Column()
	password: string;

	constructor(userId: string, password: string) {
		this.userId = userId;
		this.password = password;
	}

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		this.password = hashSync(this.password);
	}
}

export { UserCredential };
