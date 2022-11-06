import { User } from './user';

export interface UserRepository {
	save(user: User): Promise<null>;
	load(email: string): Promise<User>;
}
