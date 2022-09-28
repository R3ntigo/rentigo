import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import UsersModule from '../users/users.module';
import AuthService from './auth.service';
import LocalStrategy from './local/local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export default class AuthModule {}
