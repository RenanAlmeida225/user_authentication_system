import { User } from '../../repository/protocol/user';

export interface Singup {
	saveUser(user: Omit<User, 'id'>): Promise<string>;
}
