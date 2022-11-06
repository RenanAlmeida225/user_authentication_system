import { describe, it, expect, vi } from 'vitest';
import { Gentoken } from './genToken';

const res = 'any_token';

vi.mock('jsonwebtoken', () => {
	const sign = vi.fn(() => res);
	return { sign };
});

describe('GenPassword', () => {
	it('should return password hash', () => {
		const sut = new Gentoken();
		const token = sut.hash('any_id');
		expect(token).toEqual(res);
	});
});
