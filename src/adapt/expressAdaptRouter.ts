import { Controller } from '../controller/protocol/controller';
import { Request, Response } from 'express';
export function adaptRouter(controller: Controller) {
	return async (req: Request, res: Response) => {
		const request = {
			...(req.body || {}),
			...(req.params || {})
		};
		const httpResponse = await controller.handle(request);
		res.status(httpResponse.status).json(httpResponse.body);
	};
}
