import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private message = 'Welcome to backend';

  welcome(): { message: string } {
    return { message: this.message };
  }
}
