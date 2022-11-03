import { HttpResponse } from '../../util/helper/protocol';

export interface Controller<T = any> {
	handle(request: T): Promise<HttpResponse>;
}
