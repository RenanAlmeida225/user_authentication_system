import { User } from '../repository/protocol/user';
import { Singin } from '../service/protocol/signin';
import { MissingParamError } from '../util/error';
import { Response } from '../util/helper/httpResponse';
import { HttpResponse } from '../util/helper/protocol';
import { Controller } from './protocol/controller';

export class SigninController
	implements Controller<Omit<User, 'id' | 'userName'>>
{
	readonly #service: Singin;
	constructor(service: Singin) {
		this.#service = service;
	}
	async handle(request: Omit<User, 'id' | 'userName'>): Promise<HttpResponse> {
		try {
			if (!request.email || !request.password) {
				return Response.badRequest(new MissingParamError());
			}
			const body = await this.#service.loadUser({
				email: request.email,
				password: request.password
			});
			return Response.ok(body);
		} catch (error: any) {
			return Response.serverError(error);
		}
	}
}
