import { User } from '../repository/protocol/user';
import { UserRepository } from '../repository/protocol/userRepository';
import { MissingParamError } from '../util/error/index';
import { genId, PasswordHash, genToken } from '../util/helper/protocol/index';

export class Singup {
	readonly #userRepository: UserRepository;
	readonly #gentoken: genToken;
	readonly #genId: genId;
	readonly #genPasswordHash: PasswordHash;

	constructor(
		userRepository: UserRepository,
		genToken: genToken,
		genId: genId,
		genPasswordHash: PasswordHash
	) {
		this.#userRepository = userRepository;
		this.#gentoken = genToken;
		this.#genId = genId;
		this.#genPasswordHash = genPasswordHash;
	}

	async saveUser(user: Omit<User, 'id'>): Promise<string> {
		if (!user.userName || !user.email || !user.password) {
			throw new MissingParamError();
		}
		const id = this.#genId.hash();
		await this.#userRepository.save({
			id,
			userName: user.userName,
			email: user.email,
			password: this.#genPasswordHash.hash(user.password)
		});
		const token = this.#gentoken.gen(id);
		return token;
	}
}
