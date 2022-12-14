/* eslint-disable max-classes-per-file */
import { EntityManager, MigrationInterface, QueryRunner, Repository } from 'typeorm';
import seedrandom from 'seedrandom';
import { hashSync } from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { Gender, RequestStatus, TimeUnit } from '@rentigo/constants';
import ProgressBar from 'progress';

class Factory {
	readonly seed: number;

	readonly entityManager: EntityManager;

	public genders;

	public timeUnits;

	public requestStatuses;

	public addresses;

	public resources;

	public users;

	public rentingPolicies;

	public products;

	public requests;

	public batchSize;

	constructor(seed: number, entityManager: EntityManager) {
		this.seed = seed;
		this.entityManager = entityManager;
		this.setSeed();
		this.genders = Object.values(Gender);
		this.timeUnits = Object.values(TimeUnit);
		this.requestStatuses = Object.values(RequestStatus);
	}

	private setSeed() {
		Math.random = seedrandom(String(this.seed));
		faker.seed(this.seed);
	}

	public async generateEntities() {
		const noOfUsers = 1000;
		const noOfProducts = 10000;
		const userToAddressRatio = 3;
		const userToRentingPolicyRatio = 5;
		const productToResourceRatio = 10;
		const productToRequestRatio = 10;
		this.batchSize = 100;
		this.addresses = await this.generateAddresses(noOfUsers * userToAddressRatio);
		this.resources = await this.generateResources(noOfUsers + noOfProducts * productToResourceRatio);
		this.users = await this.generateUsers(noOfUsers, userToAddressRatio);
		this.rentingPolicies = await this.generateRentingPolicies(userToRentingPolicyRatio);
		this.products = await this.generateProducts(noOfProducts, productToResourceRatio);
		this.requests = await this.generateRequests(noOfProducts * productToRequestRatio);
	}

	private async generateAddresses(n: number) {
		const addresses = [];
		for (let i = 0; i < n; i += 1) {
			const address = {
				division: faker.address.state(),
				district: faker.address.city(),
				subDistrict: faker.address.city(),
				zipCode: faker.address.zipCode(),
				details: faker.address.streetAddress(),
				label: ['Home', 'Office', 'Other'][Math.floor(Math.random() * 3)],
			};
			addresses.push(address);
		}

		const addressRepository = this.entityManager.getRepository('Address');
		const savedAddresses = await this.startBatchInsertion(addressRepository, addresses);
		return savedAddresses;
	}

	private async generateResources(n: number) {
		const resources = [];
		for (let i = 0; i < n; i += 1) {
			const resource = {
				name: `Resource ${i}`,
				mimeType: 'image/jpeg',
				size: 640 * 480,
				url: faker.image.imageUrl(640, 480, null, true),
			};
			resources.push(resource);
		}

		const resourceRepository = this.entityManager.getRepository('Resource');
		const savedResources = await this.startBatchInsertion(resourceRepository, resources);
		return savedResources;
	}

	private async generateUsers(n: number, userToAddressRatio: number) {
		const users = [];

		const orderOfN = Math.floor(Math.log10(n));

		for (let i = 0; i < n; i += 1) {
			const firstName = faker.name.firstName();
			const lastName = faker.name.lastName();
			const email = `${firstName}_${lastName}_${faker.random.alphaNumeric(orderOfN)}@rentigo.com`;
			const phone = faker.phone.number('8801#########');
			const nid = faker.random.numeric(10);
			const gender = this.getRandomGender();
			const addresses = this.addresses.slice(i * userToAddressRatio, (i + 1) * userToAddressRatio);
			const photoUrl = this.resources[i];
			const user = {
				firstName,
				lastName,
				email,
				phone,
				nid,
				gender,
				addresses,
				photoUrl,
			};
			users.push(user);
		}

		const userRepository = this.entityManager.getRepository('User');
		const savedUsers = await this.startBatchInsertion(userRepository, users);

		for (let i = 0; i < savedUsers.length; i += 1) {
			const user = savedUsers[i];
			const password = 'password';
			const credential = {
				userId: user.id,
				password: hashSync(password, Math.random()),
			};
			user.credential = credential;
		}

		const savedUsersWithCredentials = await this.startBatchInsertion(userRepository, savedUsers);
		return savedUsersWithCredentials;
	}

	private async generateRentingPolicies(userToRentingPolicyRatio: number) {
		const policies = [];
		for (let i = 0; i < this.users.length; i += 1) {
			const noOfPolicies = Math.floor(Math.random() * userToRentingPolicyRatio + 1);
			for (let j = 0; j < noOfPolicies; j += 1) {
				const policy = {
					title: `Policy ${i}-${j}`,
					shortDescription: faker.lorem.paragraph(1),
					legalDescription: faker.lorem.paragraphs(100),
					user: this.users[i],
				};
				policies.push(policy);
			}
		}

		const policyRepository = this.entityManager.getRepository('RentingPolicy');
		const savedPolicies = await this.startBatchInsertion(policyRepository, policies);

		return savedPolicies;
	}

	private async generateProducts(n: number, productToResourceRatio: number) {
		const products = [];
		const userRepository = this.entityManager.getRepository('User');

		const bar = new ProgressBar('Generating products [:bar] :percent :etas', {
			complete: '=',
			incomplete: ' ',
			width: 50,
			total: n,
		});

		for (let i = 0; i < n; i += 1) {
			// eslint-disable-next-line no-await-in-loop
			const lender = await userRepository.findOne({
				where: {
					id: this.users[Math.floor(Math.random() * this.users.length)].id,
				},
				relations: {
					rentingPolicies: true,
				}
			});

			const totalQuantity = Math.floor(Math.random() * 100);
			const product = {
				title: faker.commerce.productName(),
				description: faker.lorem.paragraphs(10),
				lender,
				address: this.getRandomAddresses(1)[0],
				imageUrls: this.getRandomResources(productToResourceRatio),
				totalQuantity,
				availableQuantity: totalQuantity,
				rentingPolicies: lender.rentingPolicies,
				tags: this.getRandomTags(5),
				pricingPolicies: this.getRandomPricingPolicies(5),
			};

			products.push(product);
			bar.tick();
		}

		const productRepository = this.entityManager.getRepository('Product');
		const savedProducts = await this.startBatchInsertion(productRepository, products);

		return savedProducts;
	}

	private async generateRequests(n: number) {
		const requests = [];

		const productRepository = this.entityManager.getRepository('Product');

		const bar = new ProgressBar('Generating requests [:bar] :percent :etas', {
			complete: '=',
			incomplete: ' ',
			width: 50,
			total: n,
		});

		for (let i = 0; i < n; i += 1) {
			const borrower = this.users[Math.floor(Math.random() * this.users.length)];

			const product = this.products[Math.floor(Math.random() * this.products.length)];

			const quantity = Math.floor(Math.random() * product.availableQuantity) + 1;
			const status = this.requestStatuses[Math.floor(Math.random() * this.requestStatuses.length)];
			const request = {
				borrower,
				product,
				quantity,
				address: borrower.addresses[Math.floor(Math.random() * borrower.addresses.length)],
				duration: {
					unit: this.timeUnits[Math.floor(Math.random() * this.timeUnits.length)],
					length: Math.floor(Math.random() * 20),
				},
				status,
			};

			if (status === RequestStatus.APPROVED) {
				// eslint-disable-next-line no-await-in-loop
				await productRepository.update(product.id, {
					availableQuantity: product.availableQuantity - quantity,
				});
			}

			requests.push(request);
			bar.tick();
		}

		const requestRepository = this.entityManager.getRepository('Request');
		const savedRequests = await this.startBatchInsertion(requestRepository, requests);

		return savedRequests;
	}

	private getRandomGender() {
		const gender = this.genders[Math.floor(Math.random() * this.genders.length)];
		return gender;
	}

	private getRandomAddresses(n: number) {
		const addresses = [];
		const randomIndexes = this.generateUniqueRandomNumbers(n, 0, this.addresses.length);
		for (let i = 0; i < n; i += 1) {
			const address = this.addresses[randomIndexes[i]];
			addresses.push(address);
		}
		return addresses;
	}

	private getRandomResources(n: number) {
		const resources = [];
		const randomIndexes = this.generateUniqueRandomNumbers(n, 0, this.resources.length);
		for (let i = 0; i < n; i += 1) {
			const resource = this.resources[randomIndexes[i]];
			resources.push(resource);
		}
		return resources;
	}

	// eslint-disable-next-line class-methods-use-this
	private getRandomTags(n: number) {
		const tags = [];
		for (let i = 0; i < n; i += 1) {
			const tag = {
				name: faker.commerce.productAdjective(),
			};
			tags.push(tag);
		}
		return tags;
	}

	private getRandomPricingPolicies(n: number) {
		const policies = [];
		for (let i = 0; i < n; i += 1) {
			const policy = {
				price: Math.floor(Math.random() * 9901) + 100,
				duration: {
					unit: this.timeUnits[Math.floor(Math.random() * this.timeUnits.length)],
					length: Math.floor(Math.random() * 20),
				}
			};
			policies.push(policy);
		}
		return policies;
	}

	// eslint-disable-next-line class-methods-use-this
	private generateUniqueRandomNumbers(n: number, min: number, max: number): number[] {
		const numbers: number[] = [];
		while (numbers.length < n) {
			const number = Math.floor(Math.random() * (max - min)) + min;
			if (!numbers.includes(number)) {
				numbers.push(number);
			}
		}
		return numbers;
	}

	private async startBatchInsertion<T>(repository: Repository<T>, entities: T[]): Promise<T[]> {
		const bar = new ProgressBar(` ${repository.metadata.tableName} [:bar] :rate/bps :percent :etas`, {
			complete: '=',
			incomplete: ' ',
			width: 50,
			total: entities.length,
		});

		let savedEntities: T[] = [];
		for (let i = 0; i < entities.length; i += this.batchSize) {
			bar.tick(0);
			const batch = entities.slice(i, i + this.batchSize);
			// eslint-disable-next-line no-await-in-loop
			const savedBatch = await repository.save(batch);
			savedEntities = savedEntities.concat(savedBatch);
			bar.tick(this.batchSize);
		}
		console.log('\n');
		return savedEntities;
	}
}

export class SeedDatabase1671831859749 implements MigrationInterface {
	// eslint-disable-next-line class-methods-use-this
	public async up(queryRunner: QueryRunner): Promise<void> {
		const entityManager = queryRunner.connection.createEntityManager();
		const seed = 123;
		const factory = new Factory(seed, entityManager);
		await factory.generateEntities();
	}

	// eslint-disable-next-line class-methods-use-this
	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query('delete from tag');
		queryRunner.query('delete from pricing_policy');
		queryRunner.query('delete from request');
		queryRunner.query('delete from product');
		queryRunner.query('delete from address');
		queryRunner.query('delete from renting_policy');
		queryRunner.query('delete from "user"');
		queryRunner.query('delete from user_credential');
		queryRunner.query('delete from resource');
	}
}
