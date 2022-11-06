import { GenTokenHash } from './protocol';
import { sign } from 'jsonwebtoken';
import { env } from '../../config/env';

export class Gentoken implements GenTokenHash {
	hash(id: string): string {
		return sign(id, env.secret);
	}
}
