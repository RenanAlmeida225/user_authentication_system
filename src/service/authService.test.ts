import { describe, it, expect } from 'vitest';
import { User } from '../repository/protocol/user';
import { UserRepository } from '../repository/protocol/userRepository';
import { InvalidParamError, MissingParamError } from '../util/error';
import {
	GenIdHash,
	GenTokenHash,
	PasswordHash,
	VerifyPasswordHash
} from '../util/helper/protocol';
import { AuthService } from './authService';

const makeVerifyPassword = () => {
	class VerifyPassword implements VerifyPasswordHash {
		res: any;
		verified(password: string, passwordHash: string): boolean {
			return this.res;
		}
	}

	const verifyPassword = new VerifyPassword();
	verifyPassword.res = true;
	return verifyPassword;
};

const makeGenPassword = () => {
	class GenPassword implements PasswordHash {
		res: any;
		hash(password: string): string {
			return this.res;
		}
	}
	const genPassword = new GenPassword();
	genPassword.res = 'any_passwordHash';
	return genPassword;
};

const makeGenId = () => {
	class GenId implements GenIdHash {
		res: any;
		hash(): string {
			return this.res;
		}
	}
	const genId = new GenId();
	genId.res = 'any_idHash';
	return genId;
};

const makeGenToken = () => {
	class GenToken implements GenTokenHash {
		res: any;
		hash(id: string): string {
			return this.res;
		}
	}
	const genToken = new GenToken();
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
	const verifyPassword = makeVerifyPassword();
	const genPassword = makeGenPassword();
	const genId = makeGenId();
	const genToken = makeGenToken();
	const repository = makeRepository();
	const sut = new AuthService(
		repository,
		genToken,
		genId,
		genPassword,
		verifyPassword
	);

	return {
		sut,
		repository,
		genToken,
		genId,
		genPassword,
		verifyPassword
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
			repository.res = undefined;
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
			const { sut, verifyPassword } = makeSut();
			verifyPassword.res = false;
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
