import { RandomId } from './protocol';
import { randomUUID } from 'crypto';
export class RandomIdCrypto implements RandomId {
	generateId(): string {
		return randomUUID();
	}
}
