import { User } from '../../data/protocol';
import { Auth } from '../../domain/service/protocol';
import { MissingParamError } from '../../util/error';
import { Response } from '../helper';
import { Controller, HttpResponse } from '../protocol';

export class LoginController
	implements Controller<Omit<User, 'id' | 'userName'>>
{
	readonly #authService: Auth;
	constructor(authService: Auth) {
		this.#authService = authService;
	}

	async handle(request: Omit<User, 'id' | 'userName'>): Promise<HttpResponse> {
		try {
			if (!request.email || !request.password) {
				return Response.badRequest(new MissingParamError());
			}
			const body = await this.#authService.login(
				request.email,
				request.password
			);
			return Response.ok(body);
		} catch (error: any) {
			return Response.serverError(error);
		}
	}
}
