import { User } from '../repository/protocol/user';
import { Auth } from '../service/protocol/auth';
import { MissingParamError } from '../util/error';
import { Response } from '../util/helper/httpResponse';
import { HttpResponse } from '../util/helper/protocol';
import { Controller } from './protocol/controller';

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
