import { HttpResponse } from './httpResponse';

export interface Middleware<T = any> {
	handle(httpRequest: T): Promise<HttpResponse | null>;
}
