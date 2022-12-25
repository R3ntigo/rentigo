import {
	UseGuards,
	Controller,
	Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { JwtAuthGuard } from './auth';

@ApiTags('app')
@Controller()
export class AppController {
	constructor(
		private appService: AppService,
	) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	welcome() {
		return this.appService.welcome();
	}
}
