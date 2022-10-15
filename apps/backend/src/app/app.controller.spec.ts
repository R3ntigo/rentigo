import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

describe('AppController', () => {
	// TODO: Integrate auth with jwt
	// let app: TestingModule;

	// beforeAll(async () => {
	// 	app = await Test.createTestingModule({
	// 		controllers: [AppController],
	// 		providers: [AppService],
	// 	}).compile();
	// });

	describe('welcome', () => {
		it('should return "Welcome to backend!"', () => {
			// const appController = app.get<AppController>(AppController);
			// expect(appController.welcome()).toEqual({
			// 	message: 'Welcome to backend!',
			// });
		});
	});
});
