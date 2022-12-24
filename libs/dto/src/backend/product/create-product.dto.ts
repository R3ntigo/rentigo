export class CreateProductDto {
	description: string;

	title: string;

	lender: string;

	address: string;

	rentingPolicies: string[];

	pricingPolicies: string[];

	tags: string[];

	family?: string;

	// category;

	imageUrls: string[];

	totalQuantity: number;
}
