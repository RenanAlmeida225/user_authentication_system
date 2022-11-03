import { describe, it, expect } from 'vitest';
import { User } from '../repository/protocol/user';
import { Singin } from '../service/protocol/signin';
import { SigninController } from './signinController';

const makeService = () => {
	class Signinservice implements Singin {
		token!: string;
		async loadUser({
			email,
			password
		}: Omit<User, 'id' | 'userName'>): Promise<string> {
			return this.token;
		}
	}
	const service = new Signinservice();
	service.token = 'any_token';
	return service;
};

const makeSut = () => {
	const service = makeService();
	const sut = new SigninController(service);
	return {
		sut,
		service
	};
};

describe('SigninController', () => {
	it('should return code 400 if email is not provided', async () => {
		const res = { status: 400, body: { error: 'missing param' } };
		const { sut } = makeSut();
		const promise = await sut.handle({ email: '', password: '' });
		expect(promise).toEqual(res);
	});

	it('should return code 400 if password is not provided', async () => {
		const res = { status: 400, body: { error: 'missing param' } };
		const { sut } = makeSut();
		const promise = await sut.handle({
			email: 'any_email@mail.com',
			password: ''
		});
		expect(promise).toEqual(res);
	});

	it('should return code 200 if all correct', async () => {
		const res = { status: 200, body: 'any_token' };
		const { sut } = makeSut();
		const promise = await sut.handle({
			email: 'any_email@mail.com',
			password: 'any_password'
		});
		expect(promise).toEqual(res);
	});
});
