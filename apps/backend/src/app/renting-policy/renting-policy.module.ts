import { Module } from '@nestjs/common';
import { RentingPolicyService } from './renting-policy.service';
import { RentingPolicyController } from './renting-policy.controller';
import { RentingPolicyRepository } from './renting-policy.repository';
import { UsersModule } from '../user/user.module';

@Module({
	imports: [
		UsersModule
	],
	controllers: [RentingPolicyController],
	providers: [RentingPolicyService, RentingPolicyRepository],
	exports: [RentingPolicyService, RentingPolicyRepository]
})
export class RentingPolicyModule {}
