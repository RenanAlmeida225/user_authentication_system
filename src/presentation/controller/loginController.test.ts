import { describe, it, expect } from 'vitest';
import { User } from '../../data/protocol';
import { Auth } from '../../domain/service/protocol';
import { EmailValidator } from '../../util/helper/protocol';
import { LoginController } from './loginController';

const makeValidateEmail = () => {
	class ValidateEmail implements EmailValidator {
		res: any;
		isEmail(email: string): boolean {
			return this.res;
		}
	}

	const validateEmail = new ValidateEmail();
	validateEmail.res = true;
	return validateEmail;
};

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
	const validateEmail = makeValidateEmail();
	const service = makeServiceError();
	const sut = new LoginController(service, validateEmail);
	return {
		sut,
		service
	};
};
const makeService = () => {
	class Service implements Auth {
		res: any;
		register(user: Omit<User, 'id'>): Promise<string> {
			throw new Error('Method not implemented.');
		}
		async login(email: string, password: string): Promise<string> {
			return this.res;
		}
	}
	const service = new Service();
	service.res = 'any_token';
	return service;
};

const makeSut = () => {
	const validateEmail = makeValidateEmail();
	const service = makeService();
	const sut = new LoginController(service, validateEmail);
	return {
		sut,
		service,
		validateEmail
	};
};

describe('LoginController', () => {
	it('should return status code 400 if email is not provided', async () => {
		const request = {
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
			email: 'any_email@mail.com',
			password: ''
		};
		const { sut } = makeSut();
		const promise = await sut.handle(request);
		expect(promise.status).toEqual(400);
		expect(promise.body).toEqual({ error: 'missing param' });
	});
	it('should return status code 400 if email is invalid', async () => {
		const request = {
			email: 'invalid_email',
			password: 'any_password'
		};
		const { sut, validateEmail } = makeSut();
		validateEmail.res = false;
		const promise = await sut.handle(request);
		expect(promise.status).toEqual(400);
		expect(promise.body).toEqual({ error: 'invalid param' });
	});

	it('should return status code 500 if throw in service', async () => {
		const request = {
			email: 'any_email@mail.com',
			password: 'any_password'
		};
		const { sut } = makeSutError();
		const promise = await sut.handle(request);
		expect(promise.status).toEqual(500);
	});

	it('should return status code 200 if all is correct', async () => {
		const request = {
			email: 'any_email@mail.com',
			password: 'any_password'
		};
		const { sut } = makeSut();
		const promise = await sut.handle(request);
		expect(promise.status).toEqual(200);
		expect(promise.body).toEqual('any_token');
	});
});
