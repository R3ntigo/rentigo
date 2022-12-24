import { Test, TestingModule } from '@nestjs/testing';
import { RentingPolicyController } from './renting-policy.controller';
import { RentingPolicyService } from './renting-policy.service';

describe('RentingPolicyController', () => {
	let controller: RentingPolicyController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RentingPolicyController],
			providers: [RentingPolicyService],
		}).compile();

		controller = module.get<RentingPolicyController>(RentingPolicyController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
