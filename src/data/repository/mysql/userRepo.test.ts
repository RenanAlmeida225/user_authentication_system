import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MissingParamError } from '../../../util/error';

import connection from './connection';
import { UserRepo } from './userRepo';

const makeSut = () => {
	return new UserRepo();
};

describe('UserRepo', () => {
	afterEach(async () => {
		const conn = await connection();
		await conn.execute('DELETE FROM user WHERE id != ?;', ['a']);
		await conn.end();
	});
	describe('save', () => {
		it('should throw if id is no provided', async () => {
			const data = {
				id: '',
				userName: '',
				email: '',
				password: ''
			};
			const sut = makeSut();
			const promise = sut.save(data);
			expect(promise).rejects.toThrow(new MissingParamError());
		});
		it('should throw if userName is no provided', async () => {
			const data = {
				id: 'any_id',
				userName: '',
				email: '',
				password: ''
			};
			const sut = makeSut();
			const promise = sut.save(data);
			expect(promise).rejects.toThrow(new MissingParamError());
		});
		it('should throw if email is no provided', async () => {
			const data = {
				id: 'any_id',
				userName: 'any_userName',
				email: '',
				password: ''
			};
			const sut = makeSut();
			const promise = sut.save(data);
			expect(promise).rejects.toThrow(new MissingParamError());
		});
		it('should throw if password is no provided', async () => {
			const data = {
				id: 'any_id',
				userName: 'any_userName',
				email: 'any_email@mail.com',
				password: ''
			};
			const sut = makeSut();
			const promise = sut.save(data);
			expect(promise).rejects.toThrow(new MissingParamError());
		});
		it('should return null if all correct', async () => {
			const data = {
				id: 'any_id',
				userName: 'any_userName',
				email: 'any_email@mail.com',
				password: 'any_passwordHash'
			};
			const sut = makeSut();
			const user = await sut.save(data);
			expect(user).toBeNull();
		});
	});

	describe('load', () => {
		it('should throw if email is not provided', async () => {
			const sut = makeSut();
			const promise = sut.load('');
			expect(promise).rejects.toThrow(new MissingParamError());
		});
		it('should return undefined if email is not existis', async () => {
			const sut = makeSut();
			const user = await sut.load('invalid_email@mail.com');
			expect(user).toBeUndefined();
		});
		it('should return user if email is correct', async () => {
			const res = {
				id: 'any_id',
				email: 'valid_email@mail.com',
				userName: 'any_userName',
				password: 'any_password'
			};
			const conn = await connection();
			await conn.execute(`INSERT INTO user (id, userName, email, password)
            VALUES (
                'any_id',
                'any_userName',
                'valid_email@mail.com',
                'any_password'
            );`);
			await conn.end();

			const sut = makeSut();
			const user = await sut.load('valid_email@mail.com');
			expect(user).toEqual(res);
		});
	});
});
