import { UserRepo } from '../../data/repository/mysql/userRepo';
import { AuthService } from '../../domain/service';
import { EncrypterBcryptjs, TokenJwt, RandomIdCrypto } from '../../util/helper';

export function makeAuthService() {
	return new AuthService(
		new UserRepo(),
		new TokenJwt(),
		new EncrypterBcryptjs(),
		new RandomIdCrypto()
	);
}
