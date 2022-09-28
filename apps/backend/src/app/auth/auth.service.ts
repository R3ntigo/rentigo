import { Injectable } from '@nestjs/common';
import UsersService from '../users/users.service';

@Injectable()
export default class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(name);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
