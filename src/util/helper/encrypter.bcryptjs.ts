import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { MissingParamError } from '../error';
import { Encrypter } from './protocol/encrypter';

export class EncrypterBcryptjs implements Encrypter {
	genarateHash(value: string): string {
		if (!value) {
			throw new MissingParamError();
		}
		return hashSync(value, genSaltSync(10));
	}
	compareHash(value: string, hashedValue: string): boolean {
		if (!value || !hashedValue) {
			throw new MissingParamError();
		}
		return compareSync(value, hashedValue);
	}
}
