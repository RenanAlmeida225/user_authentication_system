import { describe, it, expect, vi } from 'vitest';
import { GenPassword } from './genPassword';

const res = 'any_passwordHash';

vi.mock('bcryptjs', () => {
	const genSaltSync = vi.fn();
	const hashSync = vi.fn(() => res);
	return { hashSync, genSaltSync };
});

describe('GenPassword', () => {
	it('should return password hash', () => {
		const sut = new GenPassword();
		const password = sut.hash('any_password');
		expect(password).toEqual(res);
	});
});
