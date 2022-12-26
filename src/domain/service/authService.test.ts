import { describe, it, expect } from 'vitest';
import { User, UserRepository } from '../../data/protocol';
import { InvalidParamError, MissingParamError } from '../../util/error';
import { Encrypter, Token, RandomId } from '../../util/helper/protocol';
import { AuthService } from './authService';

const makeRandomId = () => {
	class RandomIdtest implements RandomId {
		res: any;
		generateId(): string {
			return this.res;
		}
	}
	const genId = new RandomIdtest();
	genId.res = 'any_idHash';
	return genId;
};

const makeEncrypter = () => {
	class EncrypterTest implements Encrypter {
		res: any;
		genarateHash(value: string): string {
			return this.res;
		}
		compareHash(value: string, hashedValue: string): boolean {
			return this.res;
		}
	}

	const verifyPassword = new EncrypterTest();
	verifyPassword.res = 'hash';
	return verifyPassword;
};

const makeToken = () => {
	class TokenTest implements Token {
		res: any;
		generateToken(playload: string): string {
			return this.res;
		}
		verifyToken(token: string): boolean {
			return this.res;
		}
	}
	const genToken = new TokenTest();
	genToken.res = 'any_token';
	return genToken;
};

const makeRepository = () => {
	class Repository implements UserRepository {
		res: any;
		async save(user: User): Promise<null> {
			return this.res;
		}
		async load(email: string): Promise<User> {
			return this.res;
		}
	}
	const repository = new Repository();
	repository.res = {
		id: 'any_id',
		userName: 'any_userName',
		email: 'any_email@mail.com',
		password: 'any_password'
	};
	return repository;
};

const makeSut = () => {
	const randomId = makeRandomId();
	const encrypter = makeEncrypter();
	const token = makeToken();
	const repository = makeRepository();
	const sut = new AuthService(repository, token, encrypter, randomId);

	return {
		sut,
		repository,
		token,
		encrypter,
		randomId
	};
};

describe('AuthService', () => {
	describe('register', () => {
		it('should throw if userName is not provided', async () => {
			const data = {
				userName: '',
				email: '',
				password: ''
			};
			const { sut } = makeSut();
			const promise = sut.register(data);
			expect(promise).rejects.toThrow(new MissingParamError());
		});
		it('should throw if email is not provided', async () => {
			const data = {
				userName: 'any_userName',
				email: '',
				password: ''
			};
			const { sut } = makeSut();
			const promise = sut.register(data);
			expect(promise).rejects.toThrow(new MissingParamError());
		});
		it('should throw if password is not provided', async () => {
			const data = {
				userName: 'any_userName',
				email: 'any_email@mail.com',
				password: ''
			};
			const { sut } = makeSut();
			const promise = sut.register(data);
			expect(promise).rejects.toThrow(new MissingParamError());
		});
		it('should throw if email is invalid', async () => {
			const data = {
				userName: 'any_userName',
				email: 'invalid_email@mail.com',
				password: 'any_password'
			};
			const { sut } = makeSut();
			const promise = sut.register(data);
			expect(promise).rejects.toThrow(new InvalidParamError());
		});
		it('should return token if all correct', async () => {
			const data = {
				userName: 'any_userName',
				email: 'any_email@mail.com',
				password: 'any_password'
			};
			const { sut, repository } = makeSut();
			repository.res = null;
			const promise = await sut.register(data);
			expect(promise).toEqual('any_token');
		});
	});
	describe('login', () => {
		it('should throw if email is not provided', async () => {
			const { sut } = makeSut();
			const promise = sut.login('', '');
			expect(promise).rejects.toThrow(new MissingParamError());
		});
		it('should throw if password is not provided', async () => {
			const { sut } = makeSut();
			const promise = sut.login('any_email@mail.com', '');
			expect(promise).rejects.toThrow(new MissingParamError());
		});
		it('should throw if email is invalid', async () => {
			const { sut, repository } = makeSut();
			repository.res = undefined;
			const promise = sut.login('invalid_email@mail.com', 'any_password');
			expect(promise).rejects.toThrow(new InvalidParamError());
		});
		it('should throw if password is invalid', async () => {
			const { sut, encrypter } = makeSut();
			encrypter.res = false;
			const promise = sut.login('any_email@mail.com', 'invalid_password');
			expect(promise).rejects.toThrow(new InvalidParamError());
		});
		it('should return token if all correct', async () => {
			const { sut } = makeSut();
			const promise = await sut.login('any_email@mail.com', 'any_password');
			expect(promise).toEqual('any_token');
		});
	});
});
