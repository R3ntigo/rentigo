import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('welcome', () => {
    it('should return "Welcome to backend!"', () => {
      expect(service.welcome()).toEqual({ message: 'Welcome to backend!' });
    });
  });
});
