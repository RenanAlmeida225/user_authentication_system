export class MissingParamError extends Error {
	constructor() {
		super('missing param');
		super.name = 'Missing Param Error';
	}
}
