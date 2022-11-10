import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UsersModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
				signOptions: { expiresIn: '1h' },
			}),
			inject: [ConfigService],
		}),
	],
	providers: [AuthService, LocalAuthGuard, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
