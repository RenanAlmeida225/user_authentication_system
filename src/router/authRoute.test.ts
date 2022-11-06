import { describe, expect, it } from 'vitest';
import supertest from 'supertest';
import app from '..';
describe('AuthRoute', () => {
	describe('Signup POST /api/v1/auth/signup', () => {
		it('should return 400 if username is not provided', async () => {
			const data = {};
			const res = { error: 'missing param' };
			await supertest(app)
				.post('/api/v1/auth/signup')
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
				.post('/api/v1/auth/signup')
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
				.post('/api/v1/auth/signup')
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
			await supertest(app).post('/api/v1/auth/signup').send(data).expect(201);
		});
	});
	describe('Signin POST /api/v1/auth/signin', () => {
		it('should return 400 if email is not provided', async () => {
			const data = {};
			const res = { error: 'missing param' };
			await supertest(app)
				.post('/api/v1/auth/signin')
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
				.post('/api/v1/auth/signin')
				.send(data)
				.expect(400)
				.then(async response => {
					expect(response.body).toEqual(res);
				});
		});
		it('should return 200 if all params if provided', async () => {
			const data = {
				email: 'any_email@mail.com',
				password: 'any_password'
			};
			const res = { error: 'missing param' };
			await supertest(app)
				.post('/api/v1/auth/signin')
				.send(data)
				.expect(500)
				.then(async response => {
					expect(response.body).toEqual(res);
				});
		});
	});
});
