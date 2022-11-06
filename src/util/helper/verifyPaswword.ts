import { VerifyPasswordHash } from './protocol';
import { compareSync } from 'bcryptjs';

export class VerifyPassword implements VerifyPasswordHash {
	verified(password: string, passwordHash: string): boolean {
		return compareSync(password, passwordHash);
	}
}
