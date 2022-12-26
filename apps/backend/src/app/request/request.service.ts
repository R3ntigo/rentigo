import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsRelations, In } from 'typeorm';

import { Request, User } from '@rentigo/models';
import { CreateRequestDto, UpdateRequestDto } from '@rentigo/dto';

import { Operations } from '@rentigo/constants';

@Injectable()
export class RequestService {}
