import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@rentigo/types';

import { ConfigService } from '../config/config.service';
import { UsersService } from '../users/users.service';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: User) {
    const { username } = payload;
    const user = await this.usersService.findOne(username);
    return user;
  }
}

export { JwtStrategy };
