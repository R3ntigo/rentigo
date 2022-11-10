import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const openAPI = (app: INestApplication) => {
	if (process.env.NODE_ENV === 'production') {
		return;
	}
	const config = new DocumentBuilder()
		.setTitle('Rentigo API')
		.setDescription('Rentigo API description')
		.setVersion('1.0')
		.addTag('backend')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
};

export { openAPI };
