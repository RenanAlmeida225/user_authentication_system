import { afterEach, describe, expect, it } from 'vitest';
import supertest from 'supertest';
import app from '..';
import connection from '../../data/repository/mysql/connection';
import { AuthService } from '../../domain/service';
import { makeAuthService } from '../factory';
describe('AuthRoute', () => {
	afterEach(async () => {
		const conn = await connection();
		await conn.execute('DELETE FROM user WHERE id != ?;', ['a']);
		await conn.end();
	});
	describe('Register POST /api/v1/auth/register', () => {
		it('should return 400 if username is not provided', async () => {
			const data = {};
			const res = { error: 'missing param' };
			await supertest(app)
				.post('/api/v1/auth/register')
				.send(data)
				.expect(400)
				.then(async response => {
					expect(response.body).toEqual(res);
				});
		});

		it('should return 400 if email is not provided', async () => {
			const data = {
				userName: 'any_userName'
			};
			const res = { error: 'missing param' };
			await supertest(app)
				.post('/api/v1/auth/register')
				.send(data)
				.expect(400)
				.then(async response => {
					expect(response.body).toEqual(res);
				});
		});

		it('should return 400 if password is not provided', async () => {
			const data = {
				userName: 'any_userName',
				email: 'any_email@mail.com'
			};
			const res = { error: 'missing param' };
			await supertest(app)
				.post('/api/v1/auth/register')
				.send(data)
				.expect(400)
				.then(async response => {
					expect(response.body).toEqual(res);
				});
		});
		it('should return 400 if email is invalid', async () => {
			const data = {
				userName: 'any_userName',
				email: 'any_emailmailcom',
				password: 'any_password'
			};
			const res = { error: 'invalid param' };
			await supertest(app)
				.post('/api/v1/auth/register')
				.send(data)
				.expect(400)
				.then(async response => {
					expect(response.body).toEqual(res);
				});
		});

		it('should return 201 if all params is provided', async () => {
			const data = {
				userName: 'any_userName',
				email: 'any_email@mail.com',
				password: 'any_password'
			};
			await supertest(app).post('/api/v1/auth/register').send(data).expect(201);
		});
	});

	describe('Login POST /api/v1/auth/login', () => {
		it('should return 400 if email is not provided', async () => {
			const data = {};
			const res = { error: 'missing param' };
			await supertest(app)
				.post('/api/v1/auth/login')
				.send(data)
				.expect(400)
				.then(async response => {
					expect(response.body).toEqual(res);
				});
		});
		it('should return 400 if password is not provided', async () => {
			const data = {
				email: 'any_email@mail.com'
			};
			const res = { error: 'missing param' };
			await supertest(app)
				.post('/api/v1/auth/login')
				.send(data)
				.expect(400)
				.then(async response => {
					expect(response.body).toEqual(res);
				});
		});
		it('should return 400 if email is invalid', async () => {
			const data = {
				email: 'invalid_emailmailcom',
				password: 'any_password'
			};
			const res = { error: 'invalid param' };
			await supertest(app)
				.post('/api/v1/auth/login')
				.send(data)
				.expect(400)
				.then(async response => {
					expect(response.body).toEqual(res);
				});
		});
		it('should return 200 if all params if provided', async () => {
			const data = {
				email: 'valid_email@mail.com',
				password: 'any_password'
			};

			const service = makeAuthService();
			await service.register({
				userName: 'any_userName',
				email: 'valid_email@mail.com',
				password: 'any_password'
			});
			await supertest(app).post('/api/v1/auth/login').send(data).expect(200);
		});
	});
});
