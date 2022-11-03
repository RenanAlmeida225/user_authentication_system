import { User } from '../../repository/protocol/user';

export interface Singin {
	loadUser({ email, password }: Omit<User, 'id' | 'userName'>): Promise<string>;
}
