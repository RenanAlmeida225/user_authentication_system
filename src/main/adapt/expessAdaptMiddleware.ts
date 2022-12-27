import { Request, Response, NextFunction } from 'express';
import { Middleware } from '../../presentation/protocol';

export function adaptMiddleware(middleware: Middleware) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const httpRequest = {
			...(req.body || {}),
			...(req.params || {}),
			...(req.headers || {})
		};
		const httpResponse = await middleware.handle(httpRequest);
		if (!httpResponse) {
			return next();
		}
		res.status(httpResponse.status).json(httpResponse.body);
	};
}
