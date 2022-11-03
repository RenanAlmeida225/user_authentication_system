export class InvalidParamError extends Error {
	constructor() {
		super('invalid param');
		super.name = 'Invalid Param error';
	}
}
