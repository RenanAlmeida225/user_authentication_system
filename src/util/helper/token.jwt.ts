import { sign, verify } from 'jsonwebtoken';
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
	verifyToken(token: string): string | null {
		try {
			const decoded: any = verify(token, env.secret);
			return decoded;
		} catch (error) {
			return null;
		}
	}
}
