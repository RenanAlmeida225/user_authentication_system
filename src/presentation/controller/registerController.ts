import { User } from '../../data/protocol';
import { Auth } from '../../domain/service/protocol';
import { InvalidParamError, MissingParamError } from '../../util/error';
import { EmailValidator } from '../../util/helper/protocol';
import { Response } from '../helper';
import { Controller, HttpResponse } from '../protocol';

export class RegisterController implements Controller<Omit<User, 'id'>> {
	readonly #authService: Auth;
	readonly #validateEmail: EmailValidator;
	constructor(authService: Auth, validateEmail: EmailValidator) {
		this.#authService = authService;
		this.#validateEmail = validateEmail;
	}
	async handle(request: Omit<User, 'id'>): Promise<HttpResponse> {
		try {
			if (!request.userName || !request.email || !request.password) {
				return Response.badRequest(new MissingParamError());
			}
			if (!this.#validateEmail.isEmail(request.email)) {
				return Response.badRequest(new InvalidParamError());
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
