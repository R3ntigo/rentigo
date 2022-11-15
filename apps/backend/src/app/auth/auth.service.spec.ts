// import { JwtModule, JwtService } from '@nestjs/jwt';
// import { Test, TestingModule } from '@nestjs/testing';
// import { ConfigService } from '@nestjs/config';
// import { UsersService } from '../user/user.service';

// import { AuthService } from './auth.service';

describe('AuthService', () => {
	// let service: AuthService;

	// beforeEach(async () => {
	// 	const module: TestingModule = await Test.createTestingModule({
	// 		providers: [AuthService, { provide: UsersService, useClass: UsersService }, { provide: JwtService,
	// 			useValue: JwtModule.registerAsync({
	// 				useFactory: async (configService: ConfigService) => ({
	// 					secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
	// 					signOptions: { expiresIn: '60s' },
	// 				}),
	// 				inject: [ConfigService],
	// 			}) }, UsersService],
	// 	}).compile();

	// 	service = module.get<AuthService>(AuthService);
	// });

	it('should be defined', () => {
		// expect(service).toBeDefined();
	});
});
