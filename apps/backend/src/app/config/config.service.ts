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
}
