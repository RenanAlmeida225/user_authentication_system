import { describe, it, expect, beforeEach } from 'vitest';
import { MissingParamError } from '../../util/error';
import connection from './connection';
import { UserRepo } from './userRepo';

const makeSut = () => {
	return new UserRepo();
};

describe('UserRepo', () => {
	beforeEach(async () => {
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
			const data = { email: '' };
			const sut = makeSut();
			const promise = sut.load(data);
			expect(promise).rejects.toThrow(new MissingParamError());
		});
		it('should ', async () => {
			const data = { email: 'any_email@mail.com' };
			const sut = makeSut();
			const user = await sut.load(data);
			console.log('user==>', user);
			expect(user).toBeUndefined();
		});
		it('should ', async () => {
			const conn = await connection();
			conn.execute(`INSERT INTO user (id, user_name, user_email, user_password)
            VALUES (
                'any_id',
                'any_userName',
                'any_email@mail.com',
                'any_password'
            );`);
			conn.end();
			const data = { email: 'any_email@mail.com' };
			const sut = makeSut();
			const user = await sut.load(data);
			expect(user).toBe('');
		});
	});
});
