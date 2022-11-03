import { User } from '../../../repository/protocol/user';

export interface PasswordHash {
	hash(password: User['id']): string;
}
