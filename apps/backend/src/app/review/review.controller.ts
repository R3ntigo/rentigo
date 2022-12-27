import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReqUser } from '@rentigo/decorators';
import { CreateReviewDto, UpdateReviewDto } from '@rentigo/dto';
import { Review, User } from '@rentigo/models';

import { JwtAuthGuard } from '../auth';
import { ReviewService } from './review.service';

@ApiTags('Review')
@Controller('review')
@UseGuards(JwtAuthGuard)
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Post()
	create(@Body() createReviewDto: CreateReviewDto, @ReqUser() user:User): Promise<Review> {
		return this.reviewService.create(user, createReviewDto);
	}

	@Get()
	findAll(): Promise<Review[]> {
		return this.reviewService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Review> {
		return this.reviewService.findOne(id);
	}

	@Patch()
	update(@Body() updateReviewDto: UpdateReviewDto, @ReqUser() user: User): Promise<Review> {
		return this.reviewService.update(user, updateReviewDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string, @ReqUser() user: User): Promise<Review> {
		return this.reviewService.remove(user, id);
	}
}
