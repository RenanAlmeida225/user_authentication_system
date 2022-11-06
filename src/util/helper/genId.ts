import { GenIdHash } from './protocol';
import { randomUUID } from 'crypto';
export class GenId implements GenIdHash {
	hash(): string {
		return randomUUID();
	}
}
