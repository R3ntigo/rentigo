import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateReviewDto, UpdateReviewDto } from '@rentigo/dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Post()
	create(@Body() createReviewDto: CreateReviewDto) {
		return this.reviewService.create(createReviewDto);
	}

	@Get()
	findAll() {
		return this.reviewService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.reviewService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
		return this.reviewService.update(+id, updateReviewDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.reviewService.remove(+id);
	}
}
