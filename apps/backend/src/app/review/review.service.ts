import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsRelations, In } from 'typeorm';

import { Review, User } from '@rentigo/models';
import { CreateReviewDto, UpdateReviewDto } from '@rentigo/dto';

import { Operations } from '@rentigo/constants';

import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(
		private readonly reviewRepository: ReviewRepository,
	) {}

	create(user: User, createReviewDto: CreateReviewDto): Promise<Review> {
		const review: Review = {
			reviewer: user,
			reviewText: createReviewDto.reviewText,
			rating: createReviewDto.rating
		};
		return this.reviewRepository.save(review);
	}

	findAll(): Promise<Review[]> {
		return this.reviewRepository.find();
	}

	async findOne(id: string, relations: FindOptionsRelations<Review> = {}): Promise<Review> {
		const review = await this.reviewRepository.findOne({ where: { id }, relations });
		if (!review) {
			throw new NotFoundException();
		}

		return review;
	}

	async update(user: User, updateReviewDto: UpdateReviewDto): Promise<Review> {
		let review = await this.findOne(updateReviewDto.id);
		if (review.reviewer.id !== user.id) {
			throw new ForbiddenException();
		}
		const updatedReview: Review = {
			reviewer: user,
			reviewText: updateReviewDto.reviewText,
			rating: updateReviewDto.rating
		};
		updatedReview.id = review.id;
		review = await this.reviewRepository.save(updatedReview);
		return review;
	}

	async remove(user: User, id: string): Promise<Review> {
		const isPermitted = await this.hasPermissionTo(Operations.DELETE, user, id);
		if (!isPermitted) {
			throw new ForbiddenException();
		}
		return this.reviewRepository.softRemoveOneBy({ id });
	}

	async hasPermissionTo(_: Operations, user: User, id: string) {
		try {
			const userWithProduct = await this.reviewRepository.findOne({
				relations: { reviewer: true },
				where: { id, reviewer: { id: user.id } },
			});
			return !!userWithProduct;
		} catch (error) {
			return false;
		}
	}
}
