import { readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    this.envConfig = parse(readFileSync('.env'));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get JWT_ACCESS_TOKEN_SECRET(): string {
    return this.get('JWT_ACCESS_TOKEN_SECRET');
  }

  get JWT_REFRESH_TOKEN_SECRET(): string {
    return this.get('JWT_REFRESH_TOKEN_SECRET');
  }
}
