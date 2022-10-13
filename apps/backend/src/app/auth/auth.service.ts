import { Injectable } from '@nestjs/common';
import { User } from '@rentigo/types';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, rawPassword: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === rawPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
