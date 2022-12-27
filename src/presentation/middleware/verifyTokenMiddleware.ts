import { InvalidParamError, MissingParamError } from '../../util/error';
import { Token } from '../../util/helper/protocol';
import { Response } from '../helper';
import { HttpResponse, Middleware } from '../protocol';

type Request = {
	authorization: string;
};

export class VerifyTokenMiddleware implements Middleware<Request> {
	private readonly _token;
	constructor(token: Token) {
		this._token = token;
	}
	get token(): Token {
		return this._token;
	}
	async handle(httpRequest: Request): Promise<HttpResponse | null> {
		try {
			const bearerToken = httpRequest.authorization;
			const token = bearerToken.replace(/Bearer\s/g, '');
			if (!token) {
				return Response.badRequest(new MissingParamError());
			}
			const verified = this.token.verifyToken(token);
			if (!verified) {
				return Response.badRequest(new InvalidParamError());
			}
			return null;
		} catch (error: any) {
			return Response.serverError(error);
		}
	}
}
