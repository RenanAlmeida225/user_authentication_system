import { User } from '../../repository/protocol/user';
import { PasswordHash } from './protocol';
import { genSaltSync, hashSync } from 'bcryptjs';

export class GenPassword implements PasswordHash {
	hash(password: User['id']): string {
		return hashSync(password, genSaltSync(10));
	}
}
