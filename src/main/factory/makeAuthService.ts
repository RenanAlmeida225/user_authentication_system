import { UserRepo } from '../../data/repository/mysql/userRepo';
import { AuthService } from '../../domain/service';
import {
	GenId,
	GenPassword,
	Gentoken,
	VerifyPassword
} from '../../util/helper';

export function makeAuthService() {
	return new AuthService(
		new UserRepo(),
		new Gentoken(),
		new GenId(),
		new GenPassword(),
		new VerifyPassword()
	);
}
