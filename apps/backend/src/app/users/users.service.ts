import { Injectable } from '@nestjs/common';
import { User } from '@rentigo/types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User> {
    return this.users.find((user) => user.username === username);
  }
}
