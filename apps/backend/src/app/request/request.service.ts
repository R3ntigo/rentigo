import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsRelations, In } from 'typeorm';

import { Request, User } from '@rentigo/models';
import { CreateRequestDto, UpdateRequestDto } from '@rentigo/dto';

import { Operations } from '@rentigo/constants';

import { RentingPolicyRepository } from './renting-policy.repository';


@Injectable()
export class RequestService {}
