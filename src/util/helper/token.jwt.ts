import { sign } from 'jsonwebtoken';
import { env } from '../../config/env';
import { MissingParamError } from '../error';
import { Token } from './protocol';

export class TokenJwt implements Token {
	generateToken(playload: string): string {
		if (!playload) {
			throw new MissingParamError();
		}
		return sign(playload, env.secret);
	}
	verifyToken(token: string): boolean {
		throw new Error('Method not implemented.');
	}
}
