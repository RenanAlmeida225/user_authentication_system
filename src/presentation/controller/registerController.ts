import { User } from '../../data/protocol';
import { Auth } from '../../domain/service/protocol';
import { MissingParamError } from '../../util/error';
import { Response } from '../helper';
import { Controller, HttpResponse } from '../protocol';

export class RegisterController implements Controller<Omit<User, 'id'>> {
	readonly #authService: Auth;
	constructor(authService: Auth) {
		this.#authService = authService;
	}
	async handle(request: Omit<User, 'id'>): Promise<HttpResponse> {
		try {
			if (!request.userName || !request.email || !request.password) {
				return Response.badRequest(new MissingParamError());
			}
			const body = await this.#authService.register({
				userName: request.userName,
				email: request.email,
				password: request.password
			});
			return Response.create(body);
		} catch (error: any) {
			return Response.serverError(error);
		}
	}
}
