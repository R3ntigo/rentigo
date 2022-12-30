import { Injectable, NotFoundException } from '@nestjs/common';
import { Buckets, Gender } from '@rentigo/constants';
import { NidDto, VerifyNidDto, VerifyPhotoDto } from '@rentigo/dto';
import { Registration, User, UserCredential } from '@rentigo/models';
import { parseStringPromise } from 'xml2js';
import nodemailer from 'nodemailer';
import { ResourceService } from '../resource';
import { RegistrationRepository } from './register.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class RegisterService {
	constructor(
		private readonly resourceService: ResourceService,
		private readonly registrationRepository: RegistrationRepository,
		private readonly userService: UserService,
	) {}

	async verifyNID(verifyNidDto: VerifyNidDto): Promise<Registration> {
		const nid = await this.parseNidXml(verifyNidDto.nid.barcodeText);

		const registration = await this.registrationRepository.findOneBy({ nid: nid.pin });
		if (registration) {
			return registration;
		}

		// change the file names
		verifyNidDto.imageUrls.forEach((image: Express.Multer.File, index) => {
			image.originalname = `${nid.pin}-${index}.${image.originalname.split('.').pop()}`;
		});
		const nidResources = await Promise.all(verifyNidDto.imageUrls.map(
			(image) => this.resourceService.create(image, Buckets.NID_IMAGES)
		));

		const newRegistration: Registration = {
			nid: nid.pin,
			firstName: nid.name.split(' ')[0],
			lastName: nid.name.split(' ').slice(1).join(' '),
			// parse the date of birth from format 17 Sep 1990
			dob: new Date(nid.dob.split(' ').reverse().join('-')),
			status: 'verify-photo',
			nidImages: nidResources,
		};

		const savedRegistration = await this.registrationRepository.save(newRegistration);
		return savedRegistration;
	}

	async verifyPhoto(verifyPhotoDto: VerifyPhotoDto) {
		const { id, imageUrls } = verifyPhotoDto;

		const registration = await this.registrationRepository.findOneBy({ id });
		if (!registration) {
			throw new NotFoundException();
		}

		imageUrls.forEach((image: Express.Multer.File, index) => {
			image.originalname = `${id}-${index}.${image.originalname.split('.').pop()}`;
		});

		const resources = await Promise.all(imageUrls.map(
			(image) => this.resourceService.create(image, Buckets.USER_IMAGES)
		));

		registration.status = 'verify-personal-info';
		registration.photoUrl = resources[0];
		const updatedRegistration = await this.registrationRepository.save(registration);
		return updatedRegistration;
	}

	async verifyPersonalInfo(id: string) {
		const registration = await this.registrationRepository.findOneBy({ id });
		if (!registration) {
			throw new NotFoundException();
		}

		registration.status = 'confirm-email';
		const updatedRegistration = await this.registrationRepository.save(registration);
		return updatedRegistration;
	}

	async confirmEmail(id: string, email: string) {
		const registration = await this.registrationRepository.findOneBy({ id });
		if (!registration) {
			throw new NotFoundException();
		}

		registration.status = 'verify-email';
		// send a verification email using node mailer
		const transporter = nodemailer.createTransport({
			service: 'rentio.store',
			port: 587,
			auth: {
				user: 'admin@rentigo.store',
				pass: 'PASSWORD'
			},
			secure: false,
			tls: {
				rejectUnauthorized: false
			},
			debug: true
		});
		transporter.sendMail({
			from: 'admin@rentigo.store',
			to: email,
			subject: 'Rentigo Email Verification',
			text: 'Please verify your email by clicking the link below',
			html: `<a href="http://rentigo.store:4200/register/verify-email/${id}">Verify Email</a>`
		});
		registration.email = email;
		const updatedRegistration = await this.registrationRepository.save(registration);
		return updatedRegistration;
	}

	verifyEmail = async (id: string) => {
		const registration = await this.registrationRepository.findOneBy({ id });
		if (!registration) {
			throw new NotFoundException();
		}

		registration.status = 'verify-password';
		const updatedRegistration = await this.registrationRepository.save(registration);
		return updatedRegistration;
	};

	async verifyPassword(id: string, password: string) {
		const registration = await this.registrationRepository.findOneBy({ id });
		if (!registration) {
			throw new NotFoundException();
		}

		registration.status = 'complete';
		await this.registrationRepository.save(registration);
		const user: User = {
			email: registration.email,
			firstName: registration.firstName,
			lastName: registration.lastName,
			nid: registration.nid,
			gender: Gender.OTHER,
			phone: 'XXXXXXXXXX',
			photoUrl: registration.photoUrl,
		};

		const savedUser = await this.userService.save(user);
		const credentials = new UserCredential(savedUser.id, password);
		savedUser.credential = credentials;
		const updatedUser = await this.userService.save(savedUser);
		return registration;
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
