import { User } from '../repository/protocol/user';
import { Singup } from '../service/protocol/singup';
import { MissingParamError } from '../util/error';
import { Response } from '../util/helper/httpResponse';
import { HttpResponse } from '../util/helper/protocol';
import { Controller } from './protocol/controller';

export class SingupController implements Controller<Omit<User, 'id'>> {
	readonly #service: Singup;
	constructor(service: Singup) {
		this.#service = service;
	}
	async handle(request: Omit<User, 'id'>): Promise<HttpResponse> {
		try {
			if (!request.userName || !request.email || !request.password) {
				return Response.badRequest(new MissingParamError());
			}
			const body = await this.#service.saveUser({
				userName: request.userName,
				email: request.email,
				password: request.password
			});
			return Response.ok(body);
		} catch (error: any) {
			return Response.serverError(error);
		}
	}
}
