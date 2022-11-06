import { describe, it, expect, vi } from 'vitest';
import { VerifyPassword } from './verifyPaswword';

let res: boolean;

vi.mock('bcryptjs', () => {
	const compareSync = vi.fn(() => res);
	return { compareSync };
});

describe('GenPassword', () => {
	it('should return false if password is invalid', () => {
		const sut = new VerifyPassword();
		res = false;
		const token = sut.verified('invalid_password', 'any_passwordHash');
		expect(token).toBeFalsy();
	});
	it('should return true if password is valid', () => {
		const sut = new VerifyPassword();
		res = true;
		const token = sut.verified('invalid_password', 'any_passwordHash');
		expect(token).toBeTruthy();
	});
});
