import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

import { Strategy } from 'passport-local';

import { User } from '@rentigo/types';
import AuthService from '../auth.service';

export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(name: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(name, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
