import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class UserCredential {
	@PrimaryColumn({
		type: 'uuid',
	})
	userId: string;

	@Column()
	password: string;
}

export { UserCredential };
