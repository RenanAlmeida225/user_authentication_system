import { HttpResponse } from './httpResponse';

export interface Controller<T> {
	handle(request: T): Promise<HttpResponse>;
}
