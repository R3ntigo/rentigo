import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { ResourceModule } from '../resource';
import { RegistrationRepository } from './register.repository';
import { UserModule } from '../user';

@Module({
	imports: [
		ResourceModule,
		UserModule
	],
	controllers: [RegisterController],
	providers: [RegisterService, RegistrationRepository]
})
export class RegisterModule {}
