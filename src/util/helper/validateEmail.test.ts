import { describe, it, expect } from 'vitest';
import { ValidateEmail } from './validateEmail';

const makeSut = () => {
	return new ValidateEmail();
};

describe('ValidateEmail', () => {
	it('should return false if email is invalid', () => {
		const sut = makeSut();
		const emails = ['email@mailcom', 'email.mail.com', 'emial'];
		emails.forEach(email => {
			const response = sut.isEmail(email);
			expect(response).toBeFalsy();
		});
	});
	it('should return true if email is valid', () => {
		const sut = makeSut();
		const response = sut.isEmail('any_emial@mail.com');
		expect(response).toBeTruthy();
	});
});
