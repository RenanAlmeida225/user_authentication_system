import { RepoTest } from '../repository/repotest';
import { AuthService } from '../service/authService';
import { GenId } from '../util/helper/genId';
import { GenPassword } from '../util/helper/genPassword';
import { Gentoken } from '../util/helper/genToken';
import { VerifyPassword } from '../util/helper/verifyPaswword';

export function makeAuthService() {
	return new AuthService(
		new RepoTest(),
		new Gentoken(),
		new GenId(),
		new GenPassword(),
		new VerifyPassword()
	);
}
