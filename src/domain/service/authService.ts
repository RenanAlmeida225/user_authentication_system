import { User, UserRepository } from '../../data/protocol';
import { InvalidParamError, MissingParamError } from '../../util/error';
import { Encrypter, Token, RandomId } from '../../util/helper/protocol';
import { Auth } from './protocol/auth';

export class AuthService implements Auth {
	private readonly _userRepository: UserRepository;
	private readonly _token: Token;
	private readonly _encypter: Encrypter;
	private readonly _randomId: RandomId;

	constructor(
		userRepository: UserRepository,
		token: Token,
		encrypter: Encrypter,
		randomId: RandomId
	) {
		this._userRepository = userRepository;
		this._token = token;
		this._encypter = encrypter;
		this._randomId = randomId;
	}

	get userRepository(): UserRepository {
		return this._userRepository;
	}

	get token(): Token {
		return this._token;
	}

	get encrypter(): Encrypter {
		return this._encypter;
	}

	get randomId(): RandomId {
		return this._randomId;
	}

	async register(user: Omit<User, 'id'>): Promise<string> {
		if (!user.userName || !user.email || !user.password) {
			throw new MissingParamError();
		}
		const emailExists = await this.userRepository.load(user.email);
		if (emailExists) {
			throw new InvalidParamError();
		}
		const id = this.randomId.generateId();
		await this.userRepository.save({
			id,
			userName: user.userName,
			email: user.email,
			password: this.encrypter.genarateHash(user.password)
		});
		const token = this.token.generateToken(id);
		return token;
	}
	async login(email: string, password: string): Promise<string> {
		if (!email || !password) {
			throw new MissingParamError();
		}
		const emailExists = await this.userRepository.load(email);
		if (!emailExists) {
			throw new InvalidParamError();
		}
		if (!this.encrypter.compareHash(password, emailExists.password)) {
			throw new InvalidParamError();
		}
		return this.token.generateToken(emailExists.id);
	}
}
