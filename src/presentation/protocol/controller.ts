import { HttpResponse } from './httpResponse';

export interface Controller<T = any> {
	handle(request: T): Promise<HttpResponse>;
}
