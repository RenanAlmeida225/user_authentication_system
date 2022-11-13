import { User } from '../../data/protocol';
import { Auth } from '../../domain/service/protocol';
import { InvalidParamError, MissingParamError } from '../../util/error';
import { EmailValidator } from '../../util/helper/protocol';
import { Response } from '../helper';
import { Controller, HttpResponse } from '../protocol';

export class LoginController
	implements Controller<Omit<User, 'id' | 'userName'>>
{
	readonly #authService: Auth;
	readonly #validateEmail: EmailValidator;
	constructor(authService: Auth, validateEmail: EmailValidator) {
		this.#authService = authService;
		this.#validateEmail = validateEmail;
	}

	async handle(request: Omit<User, 'id' | 'userName'>): Promise<HttpResponse> {
		try {
			if (!request.email || !request.password) {
				return Response.badRequest(new MissingParamError());
			}
			if (!this.#validateEmail.isEmail(request.email)) {
				return Response.badRequest(new InvalidParamError());
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
