import { describe, it, expect, vi } from 'vitest';
import { FieldsValidatorValidator } from './FieldsValidator.validator';
let res: boolean;
vi.mock('validator', async () => {
	const validator = await vi.importActual('validator');
	return {
		default: { ...(validator || {}), isEmail: vi.fn(() => res) }
	};
});

const makeSut = () => {
	return new FieldsValidatorValidator();
};

describe('ValidateEmail', () => {
	it('should return false if email is invalid', () => {
		res = false;
		const sut = makeSut();
		const emails = ['email@mailcom', 'email.mail.com', 'emial'];
		emails.forEach(email => {
			const response = sut.isEmail(email);
			expect(response).toBeFalsy();
		});
	});
	it('should return true if email is valid', () => {
		res = true;
		const sut = makeSut();
		const response = sut.isEmail('any_emial@mail.com');
		expect(response).toBeTruthy();
	});
});
