import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {

  identify(name:string, clientId: string){
    return "name of c"

  }

  getClientName(clientId: string){
    return "Name of the user of ClientID";
  }

  create(createMessageDto: CreateMessageDto) {
    const message = {...createMessageDto};
    // push in the database
    return 'Return the created message';
  }

  findAll() {
    return `This action returns all messages`;
  }

}
