import { Controller, Get, Patch, Param, Body, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqUser } from '@rentigo/decorators';

import { CreateReviewDto, UpdateReviewDto } from '@rentigo/dto';
import { Review, User } from '@rentigo/models';

import { UserService } from './user.service';
import { ReviewService } from '../review/review.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
	constructor(
		private userService: UserService,
		private readonly reviewService: ReviewService
	) {
	}

	@Post('review/:id')
	async postReview(
		@Param('id') id:string,
			@Body() createReviewDto: CreateReviewDto,
			@ReqUser() user:User
	): Promise<Review> {
		const review = await this.reviewService.create(user, createReviewDto);
		this.userService.addReview(id, review);
		return review;
	}

	@Patch('review/:id')
	updateReview(@Body() updateReviewDto: UpdateReviewDto, @ReqUser() user: User): Promise<Review> {
		return this.reviewService.update(user, updateReviewDto);
	}

	@Get('reviews/:id')
	getReviews(@Param('id') id: string) {
		return this.userService.findAllReviews(id);
	}

	// create a controller to get all the addresses of a user
	@Get('addresses')
	getAllAddresses(@ReqUser() user: User) {
		console.log('user', user);
		return this.userService.getAllAddresses(user);
	}

	@Get('rentingPolicy')
	getRentingPolicy(@ReqUser() user: User) {
		console.log('user', user);
		return this.userService.getRentingPolicy(user);
	}
}
