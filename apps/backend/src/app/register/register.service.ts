import { Injectable } from '@nestjs/common';
import { Buckets } from '@rentigo/constants';
import { NidDto, VerifyNidDto } from '@rentigo/dto';
import { parseStringPromise } from 'xml2js';
import { ResourceService } from '../resource';
import { RegistrationRepository } from './register.repository';

@Injectable()
export class RegisterService {
	constructor(
		private readonly resourceService: ResourceService,
		private readonly registrationRepository: RegistrationRepository,
	) {}

	async verifyNID(verifyNidDto: VerifyNidDto): Promise<string> {
		const nid = await this.parseNidXml(verifyNidDto.nid.barcodeText);

		const registration = await this.registrationRepository.findOneBy({ nid: nid.pin });
		if (registration) {
			return registration.status;
		}

		// change the file names
		verifyNidDto.imageUrls.forEach((image: Express.Multer.File, index) => {
			image.originalname = `${nid.pin}-${index}.${image.originalname.split('.').pop()}`;
		});
		const nidResources = await Promise.all(verifyNidDto.imageUrls.map(async (image) => {
			await this.resourceService.create(image, Buckets.NID_IMAGES);
		}));

		const newRegistration = {
			nid: nid.pin,
			firstName: nid.name.split(' ')[0],
			lastName: nid.name.split(' ').slice(1).join(' '),
			// parse the date of birth from format 17 Sep 1990
			dob: new Date(nid.dob.split(' ').reverse().join('-')),
			status: '/verify-photo',
		};

		const savedRegistration = await this.registrationRepository.save(newRegistration);

		return savedRegistration.status;
	}

	// eslint-disable-next-line class-methods-use-this
	private async parseNidXml(nidXml: string): Promise<NidDto> {
		const wrappedNidXml = `<nid>${nidXml}</nid>`;
		const parsedNID = (await parseStringPromise(wrappedNidXml)).nid;
		const nid = {
			pin: parsedNID.pin[0],
			name: parsedNID.name[0],
			dob: parsedNID.DOB[0],
		};

		return nid;
	}
}
