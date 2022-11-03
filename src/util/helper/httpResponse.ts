import { HttpResponse } from './protocol';

export class Response {
	static ok(body: any): HttpResponse {
		return {
			status: 200,
			body
		};
	}

	static badRequest(error: Error): HttpResponse {
		return {
			status: 400,
			body: {
				error: error.message
			}
		};
	}

	static serverError(error: Error) {
		return {
			status: 200,
			body: {
				error: error.message
			}
		};
	}
}
