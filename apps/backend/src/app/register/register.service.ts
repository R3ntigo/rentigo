import { Injectable } from '@nestjs/common';
import { NidDto } from '@rentigo/dto';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class RegisterService {
	// eslint-disable-next-line class-methods-use-this
	async verifyNID(nidXml: string): Promise<NidDto> {
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
