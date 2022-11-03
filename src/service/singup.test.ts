import { describe, it, expect } from 'vitest';
import { User } from '../repository/protocol/user';
import { UserRepository } from '../repository/protocol/userRepository';
import { MissingParamError } from '../util/error/index';
import { genId, PasswordHash, genToken } from '../util/helper/protocol/index';
import { Singup } from './singup';

const makeGenPasswordHash = () => {
	class GenPasswordHash implements PasswordHash {
		hash(): string {
			return 'any_passwordHash';
		}
	}
	return new GenPasswordHash();
};

const makeGenId = () => {
	class GenId implements genId {
		hash(): string {
			return 'any_id';
		}
	}
	return new GenId();
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
			return null;
		}
		async load({
			email,
			password
		}: Omit<User, 'id' | 'userName'>): Promise<User> {
			throw new Error('Method not implemented.');
		}
	}

	return new Repository();
};

const makeSut = () => {
	const genPasswordHash = makeGenPasswordHash();
	const genId = makeGenId();
	const gentoken = makeGenToken();
	const repository = makeRepository();
	const sut = new Singup(repository, gentoken, genId, genPasswordHash);
	return {
		sut,
		repository
	};
};

describe('Singup', () => {
	it('should throw if userName not passed', async () => {
		const { sut } = makeSut();
		const promise = sut.saveUser({ userName: '', email: '', password: '' });
		expect(promise).rejects.toThrow(new MissingParamError());
	});
	it('should throw if email not passed', async () => {
		const { sut } = makeSut();
		const promise = sut.saveUser({
			userName: 'any_userName',
			email: '',
			password: ''
		});
		expect(promise).rejects.toThrow(new MissingParamError());
	});
	it('should throw if password not passed', async () => {
		const { sut } = makeSut();
		const promise = sut.saveUser({
			userName: 'any_userName',
			email: 'any_email@mail.com',
			password: ''
		});
		expect(promise).rejects.toThrow(new MissingParamError());
	});
	it('should return user if all fields passed', async () => {
		const { sut } = makeSut();
		const user = await sut.saveUser({
			userName: 'any_userName',
			email: 'any_email@mail.com',
			password: 'any_password'
		});
		expect(user).toEqual('any_token');
	});
});
