import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { ResourceModule } from '../resource';
import { RegistrationRepository } from './register.repository';

@Module({
	imports: [
		ResourceModule
	],
	controllers: [RegisterController],
	providers: [RegisterService, RegistrationRepository]
})
export class RegisterModule {}
