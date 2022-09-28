import { Injectable } from '@nestjs/common';
import { User } from '@rentigo/types';

@Injectable()
export default class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      name: 'maria',
      password: 'guess',
    },
  ];

  async findOne(name: string): Promise<User> {
    return this.users.find((user) => user.name === name);
  }
}
