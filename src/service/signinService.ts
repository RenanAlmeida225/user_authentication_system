import { User } from '../repository/protocol/user';
import { UserRepository } from '../repository/protocol/userRepository';
import { MissingParamError, InvalidParamError } from '../util/error/index';
import { genToken, VerifyPasswordHash } from '../util/helper/protocol/index';
import { Singin } from './protocol/signin';

export class SinginService implements Singin {
	readonly #userRepository: UserRepository;
	readonly #gentoken: genToken;
	readonly #verifyPassword: VerifyPasswordHash;
	constructor(
		userRepository: UserRepository,
		genToken: genToken,
		verifyPassword: VerifyPasswordHash
	) {
		this.#userRepository = userRepository;
		this.#gentoken = genToken;
		this.#verifyPassword = verifyPassword;
	}

	async loadUser({
		email,
		password
	}: Omit<User, 'id' | 'userName'>): Promise<string> {
		if (!email || !password) {
			throw new MissingParamError();
		}
		const user = await this.#userRepository.load({ email, password });
		if (!this.#verifyPassword.verified(password, user.password)) {
			throw new InvalidParamError();
		}
		return this.#gentoken.gen(user.id);
	}
}
