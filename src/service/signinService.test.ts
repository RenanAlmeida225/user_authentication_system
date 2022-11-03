import { describe, it, expect } from 'vitest';
import { User } from '../repository/protocol/user';
import { UserRepository } from '../repository/protocol/userRepository';
import { InvalidParamError, MissingParamError } from '../util/error/index';
import { genToken, VerifyPasswordHash } from '../util/helper/protocol';
import { SinginService } from './signinService';

const makeVerifyPasswordHash = () => {
	class VerifyPassword implements VerifyPasswordHash {
		verify!: boolean;
		verified(password: string, passwordHash: string): boolean {
			return this.verify;
		}
	}
	const verifyPasswordHash = new VerifyPassword();
	verifyPasswordHash.verify = true;
	return verifyPasswordHash;
};

const makeGenToken = () => {
	class GenToken implements genToken {
		gen(id: string): string {
			return 'any_token';
		}
	}
	return new GenToken();
};

const makeRepository = () => {
	class Repository implements UserRepository {
		async save(user: User): Promise<null> {
			throw new Error('Method not implemented.');
		}
		async load({
			email,
			password
		}: Omit<User, 'id' | 'userName'>): Promise<User> {
			return {
				id: 'any_id',
				userName: 'any_UserName',
				email: 'any_email@mail.com',
				password: 'any_passwordHash'
			};
		}
	}

	return new Repository();
};

const makeSut = () => {
	const genPasswordHash = makeVerifyPasswordHash();
	const gentoken = makeGenToken();
	const repository = makeRepository();
	const sut = new SinginService(repository, gentoken, genPasswordHash);
	return { sut, genPasswordHash };
};

describe('Singin', () => {
	it('should throw if email is not provided', async () => {
		const { sut } = makeSut();
		const promise = sut.loadUser({ email: '', password: '' });
		expect(promise).rejects.toThrow(new MissingParamError());
	});

	it('should throw if password is not provided', async () => {
		const { sut } = makeSut();
		const promise = sut.loadUser({ email: 'any_email@mail.com', password: '' });
		expect(promise).rejects.toThrow(new MissingParamError());
	});

	it('should throw if password is invalid', async () => {
		const { sut, genPasswordHash } = makeSut();
		genPasswordHash.verify = false;
		const promise = sut.loadUser({
			email: 'any_email@mail.com',
			password: 'invalid_password'
		});
		expect(promise).rejects.toThrow(new InvalidParamError());
	});
	it('should return token if password is valid', async () => {
		const { sut } = makeSut();
		const promise = await sut.loadUser({
			email: 'any_email@mail.com',
			password: 'valid_password'
		});
		expect(promise).toBe('any_token');
	});
});
