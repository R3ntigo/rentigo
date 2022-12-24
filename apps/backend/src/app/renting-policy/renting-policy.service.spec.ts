import { Test, TestingModule } from '@nestjs/testing';
import { RentingPolicyService } from './renting-policy.service';

describe('RentingPolicyService', () => {
	let service: RentingPolicyService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RentingPolicyService],
		}).compile();

		service = module.get<RentingPolicyService>(RentingPolicyService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
