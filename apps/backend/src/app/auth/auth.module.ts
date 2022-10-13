import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';
import { ConfigService } from '../config/config.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.JWT_ACCESS_TOKEN_SECRET,
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalAuthGuard, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
