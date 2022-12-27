import { Module } from '@nestjs/common';

import { UserModule } from '../user';

import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';

@Module({
	imports: [
		UserModule
	],
	controllers: [ReviewController],
	providers: [ReviewService, ReviewRepository],
	exports: [ReviewService, ReviewRepository]
})
export class ReviewModule {}
