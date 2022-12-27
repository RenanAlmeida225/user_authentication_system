import { describe, it, expect } from 'vitest';
import { Token } from '../../util/helper/protocol';
import { VerifyTokenMiddleware } from './verifyTokenMiddleware';

const makeToken = () => {
	class TokenMock implements Token {
		res: any;
		generateToken(playload: string): string {
			throw new Error('Method not implemented.');
		}
		verifyToken(token: string): string | null {
			return this.res;
		}
	}
	const tokenMock = new TokenMock();
	tokenMock.res = 'any_token';
	return tokenMock;
};

const makeSut = () => {
	const token = makeToken();
	const sut = new VerifyTokenMiddleware(token);
	return {
		sut,
		token
	};
};

describe('VerifyTokenMiddleware', () => {
	it('should return 400 if token is not provided', async () => {
		const { sut } = makeSut();
		const httpRequest = {
			authorization: 'Bearer '
		};
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse?.status).toEqual(400);
		expect(httpResponse?.body.error).toEqual('missing param');
	});
	it('should return 400 if token is invalid', async () => {
		const { sut, token } = makeSut();
		token.res = '';
		const httpRequest = {
			authorization: 'Bearer invalid_token'
		};
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse?.status).toEqual(400);
		expect(httpResponse?.body.error).toEqual('invalid param');
	});

	it('should return null if token is valid', async () => {
		const { sut } = makeSut();
		const httpRequest = {
			authorization: 'Bearer valid_token'
		};
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse).toBeNull();
	});
});
