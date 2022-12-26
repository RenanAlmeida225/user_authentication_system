import { PasswordHash } from './protocol';
import { genSaltSync, hashSync } from 'bcryptjs';
import { User } from '../../data/protocol';

export class GenPassword implements PasswordHash {
	hash(password: User['id']): string {
		return hashSync(password, genSaltSync(10));
	}
}
