import { User } from '../repository/protocol/user';
import { Auth } from '../service/protocol/auth';
import { InvalidParamError, MissingParamError } from '../util/error';
import { Response } from '../util/helper/httpResponse';
import { HttpResponse } from '../util/helper/protocol';
import { Controller } from './protocol/controller';

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
