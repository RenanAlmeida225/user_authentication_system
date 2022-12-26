import { describe, it, expect, vi } from 'vitest';
import { TokenJwt } from './token.jwt';

vi.mock('jsonwebtoken', () => {
	const sign = vi.fn(() => 'any_token');
	return {
		sign
	};
});

const makeSut = () => {
	return new TokenJwt();
};

describe('TokenJwt', () => {
	describe('generateToken', () => {
		it('should return token', () => {
			const sut = makeSut();
			const response = sut.generateToken('any_playload');
			expect(response).toEqual('any_token');
		});
	});
});
