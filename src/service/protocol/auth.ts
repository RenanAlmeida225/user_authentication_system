import { User } from '../../repository/protocol/user';

export interface Auth {
	register(user: Omit<User, 'id'>): Promise<string>;
	login(email: string, password: string): Promise<string>;
}
