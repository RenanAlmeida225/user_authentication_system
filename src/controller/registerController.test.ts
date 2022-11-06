import { describe, it, expect } from 'vitest';
import { User } from '../repository/protocol/user';
import { Auth } from '../service/protocol/auth';
import { RegisterController } from './registerController';

const makeServiceError = () => {
	class Service implements Auth {
		register(user: Omit<User, 'id'>): Promise<string> {
			throw new Error('Method not implemented.');
		}
		login(email: string, password: string): Promise<string> {
			throw new Error('Method not implemented.');
		}
	}
	return new Service();
};
const makeSutError = () => {
	const service = makeServiceError();
	const sut = new RegisterController(service);
	return {
		sut,
		service
	};
};
const makeService = () => {
	class Service implements Auth {
		res: any;
		register(user: Omit<User, 'id'>): Promise<string> {
			return this.res;
		}
		login(email: string, password: string): Promise<string> {
			throw new Error('Method not implemented.');
		}
	}
	const service = new Service();
	service.res = 'any_token';
	return service;
};

const makeSut = () => {
	const service = makeService();
	const sut = new RegisterController(service);
	return {
		sut,
		service
	};
};

describe('RegisterController', () => {
	it('should return status code 400 if userName is not provided', async () => {
		const request = {
			userName: '',
			email: '',
			password: ''
		};
		const { sut } = makeSut();
		const promise = await sut.handle(request);
		expect(promise.status).toEqual(400);
		expect(promise.body).toEqual({ error: 'missing param' });
	});
	it('should return status code 400 if email is not provided', async () => {
		const request = {
			userName: 'any_userName',
			email: '',
			password: ''
		};
		const { sut } = makeSut();
		const promise = await sut.handle(request);
		expect(promise.status).toEqual(400);
		expect(promise.body).toEqual({ error: 'missing param' });
	});
	it('should return status code 400 if password is not provided', async () => {
		const request = {
			userName: 'any_userName',
			email: 'any_email@mail.com',
			password: ''
		};
		const { sut } = makeSut();
		const promise = await sut.handle(request);
		expect(promise.status).toEqual(400);
		expect(promise.body).toEqual({ error: 'missing param' });
	});
	it('should return status code 500 if throw in service', async () => {
		const request = {
			userName: 'any_userName',
			email: 'any_email@mail.com',
			password: 'any_password'
		};
		const { sut } = makeSutError();
		const promise = await sut.handle(request);
		expect(promise.status).toEqual(500);
	});
	it('should return status code 201 if all correct', async () => {
		const request = {
			userName: 'any_userName',
			email: 'any_email@mail.com',
			password: 'any_password'
		};
		const { sut } = makeSut();
		const promise = await sut.handle(request);
		expect(promise.status).toEqual(201);
		expect(promise.body).toEqual('any_token');
	});
});
