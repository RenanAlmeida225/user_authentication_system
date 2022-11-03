import { describe, it, expect } from 'vitest';
import { User } from '../repository/protocol/user';
import { Singup } from '../service/protocol/singup';
import { SingupController } from './singupController';

const makeService = () => {
	class Singupservice implements Singup {
		token!: string;
		async saveUser(user: Omit<User, 'id'>): Promise<string> {
			return this.token;
		}
	}
	const service = new Singupservice();
	service.token = 'any_token';
	return service;
};

const makeSut = () => {
	const service = makeService();
	const sut = new SingupController(service);
	return {
		sut,
		service
	};
};

describe('SigninController', () => {
	it('should return code 400 if userName is not provided', async () => {
		const res = { status: 400, body: { error: 'missing param' } };
		const { sut } = makeSut();
		const promise = await sut.handle({ userName: '', email: '', password: '' });
		expect(promise).toEqual(res);
	});

	it('should return code 400 if email is not provided', async () => {
		const res = { status: 400, body: { error: 'missing param' } };
		const { sut } = makeSut();
		const promise = await sut.handle({
			userName: 'any_userName',
			email: '',
			password: ''
		});
		expect(promise).toEqual(res);
	});

	it('should return code 400 if password is not provided', async () => {
		const res = { status: 400, body: { error: 'missing param' } };
		const { sut } = makeSut();
		const promise = await sut.handle({
			userName: 'any_userName',
			email: 'any_email@mail.com',
			password: ''
		});
		expect(promise).toEqual(res);
	});

	it('should return code 200 if all correct', async () => {
		const res = { status: 200, body: 'any_token' };
		const { sut } = makeSut();
		const promise = await sut.handle({
			userName: 'any_userName',
			email: 'any_email@mail.com',
			password: 'any_password'
		});
		expect(promise).toEqual(res);
	});
});
