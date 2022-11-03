import { User } from './user';

export interface UserRepository {
	save(user: User): Promise<null>;
	load({ email, password }: Omit<User, 'id' | 'userName'>): Promise<User>;
}
