import { Module } from '@nestjs/common';

import { UserModule } from '../user';

import { RentingPolicyService } from './renting-policy.service';
import { RentingPolicyController } from './renting-policy.controller';
import { RentingPolicyRepository } from './renting-policy.repository';

@Module({
	imports: [
		UserModule
	],
	controllers: [RentingPolicyController],
	providers: [RentingPolicyService, RentingPolicyRepository],
	exports: [RentingPolicyService, RentingPolicyRepository]
})
export class RentingPolicyModule {}
