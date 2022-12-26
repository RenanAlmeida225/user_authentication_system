import { User } from '../../data/protocol';
import { Auth } from '../../domain/service/protocol';
import { InvalidParamError, MissingParamError } from '../../util/error';
import { FieldsValidator } from '../../util/helper/protocol';
import { Response } from '../helper';
import { Controller, HttpResponse } from '../protocol';

export class RegisterController implements Controller<Omit<User, 'id'>> {
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

	async handle(request: Omit<User, 'id'>): Promise<HttpResponse> {
		try {
			if (!request.userName || !request.email || !request.password) {
				return Response.badRequest(new MissingParamError());
			}
			if (!this.fieldsValidator.isEmail(request.email)) {
				return Response.badRequest(new InvalidParamError());
			}
			const token = await this.authService.register({
				userName: request.userName,
				email: request.email,
				password: request.password
			});
			return Response.create({ token });
		} catch (error: any) {
			return Response.serverError(error);
		}
	}
}
