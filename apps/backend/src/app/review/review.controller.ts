import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReviewService } from './review.service';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}
}
