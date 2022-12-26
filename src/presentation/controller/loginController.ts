import { User } from '../../data/protocol';
import { Auth } from '../../domain/service/protocol';
import { InvalidParamError, MissingParamError } from '../../util/error';
import { FieldsValidator } from '../../util/helper/protocol';
import { Response } from '../helper';
import { Controller, HttpResponse } from '../protocol';

export class LoginController
	implements Controller<Omit<User, 'id' | 'userName'>>
{
	private readonly _authService: Auth;
	private readonly _fieldsValidator: FieldsValidator;
	constructor(authService: Auth, fieldsValidator: FieldsValidator) {
		this._authService = authService;
		this._fieldsValidator = fieldsValidator;
	}

	get authService(): Auth {
		return this._authService;
	}

	get fieldsValidator(): FieldsValidator {
		return this._fieldsValidator;
	}

	async handle(request: Omit<User, 'id' | 'userName'>): Promise<HttpResponse> {
		try {
			if (!request.email || !request.password) {
				return Response.badRequest(new MissingParamError());
			}
			if (!this.fieldsValidator.isEmail(request.email)) {
				return Response.badRequest(new InvalidParamError());
			}
			const token = await this.authService.login(
				request.email,
				request.password
			);
			return Response.ok({ token });
		} catch (error: any) {
			return Response.serverError(error);
		}
	}
}
