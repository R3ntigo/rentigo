import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { openAPI } from './app/config/swagger.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);

	app.useGlobalPipes(new ValidationPipe());
	app.use(cookieParser());

	openAPI(app);

	const port = process.env.PORT || 3333;
	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
	);
}

bootstrap();
