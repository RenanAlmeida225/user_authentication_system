import { describe, it, expect, vi } from 'vitest';
import { EncrypterBcryptjs } from './encrypter.bcryptjs';
let compared: boolean;
vi.mock('bcryptjs', () => {
	const genSaltSync = vi.fn(() => 'salt');
	const hashSync = vi.fn(() => 'any_hashedValue');
	const compareSync = vi.fn(() => compared);
	return {
		genSaltSync,
		hashSync,
		compareSync
	};
});

const makeSut = () => {
	return new EncrypterBcryptjs();
};

describe('EncrypterBcryptjs', () => {
	describe('generateHash', () => {
		it('should return hash', () => {
			const sut = makeSut();
			const response = sut.genarateHash('any_value');
			expect(response).toEqual('any_hashedValue');
		});
	});
	describe('compareHash', () => {
		it('should return false if value not is compatible with hash', () => {
			compared = false;
			const sut = makeSut();
			const response = sut.compareHash('invalid_value', 'any_hashedValue');
			expect(response).toBeFalsy();
		});
		it('should return true if value is compatible with hash', () => {
			compared = true;
			const sut = makeSut();
			const response = sut.compareHash('valid_value', 'any_hashedValue');
			expect(response).toBeTruthy();
		});
	});
});
