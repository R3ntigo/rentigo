import { Injectable } from '@nestjs/common';

@Injectable()
class AppService {
  private message = 'Welcome to backend!';

  getData(): { message: string } {
    return { message: this.message };
  }
}

export default AppService;
