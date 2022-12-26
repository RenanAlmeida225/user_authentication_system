import { describe, it, expect, vi } from 'vitest';
import { RandomIdCrypto } from './randomId.crypto';

vi.mock('crypto', () => {
	const randomUUID = vi.fn(() => 'any_randomId');
	return { randomUUID };
});

describe('RandomIdCrypto', () => {
	it('should return uuid', () => {
		const sut = new RandomIdCrypto();
		const id = sut.generateId();
		expect(id).toEqual('any_randomId');
	});
});
