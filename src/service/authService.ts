import { User } from '../repository/protocol/user';
import { UserRepository } from '../repository/protocol/userRepository';
import { InvalidParamError, MissingParamError } from '../util/error';
import {
	GenIdHash,
	GenTokenHash,
	PasswordHash,
	VerifyPasswordHash
} from '../util/helper/protocol';
import { Auth } from './protocol/auth';

export class AuthService implements Auth {
	readonly #userRepository: UserRepository;
	readonly #gentoken: GenTokenHash;
	readonly #genId: GenIdHash;
	readonly #genPasswordHash: PasswordHash;
	readonly #verifyPassword: VerifyPasswordHash;

	constructor(
		userRepository: UserRepository,
		genToken: GenTokenHash,
		genId: GenIdHash,
		genPasswordHash: PasswordHash,
		verifyPassword: VerifyPasswordHash
	) {
		this.#userRepository = userRepository;
		this.#gentoken = genToken;
		this.#genId = genId;
		this.#genPasswordHash = genPasswordHash;
		this.#verifyPassword = verifyPassword;
	}
	async register(user: Omit<User, 'id'>): Promise<string> {
		if (!user.userName || !user.email || !user.password) {
			throw new MissingParamError();
		}
		const emailExists = await this.#userRepository.load(user.email);
		if (emailExists) {
			throw new InvalidParamError();
		}
		const id = this.#genId.hash();
		await this.#userRepository.save({
			id,
			userName: user.userName,
			email: user.email,
			password: this.#genPasswordHash.hash(user.password)
		});
		const token = this.#gentoken.hash(id);
		return token;
	}
	async login(email: string, password: string): Promise<string> {
		if (!email || !password) {
			throw new MissingParamError();
		}
		const emailExists = await this.#userRepository.load(email);
		if (!emailExists) {
			throw new InvalidParamError();
		}
		if (!this.#verifyPassword.verified(password, emailExists.password)) {
			throw new InvalidParamError();
		}
		return this.#gentoken.hash(emailExists.id);
	}
}
