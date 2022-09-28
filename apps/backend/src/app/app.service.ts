import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private message = 'Welcome to backend!';

  getData(): { message: string } {
    return { message: this.message };
  }
}
