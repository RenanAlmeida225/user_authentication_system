import { LoginController } from '../../presentation/controller';
import { makeAuthService } from './';

export function makeLoginController() {
	return new LoginController(makeAuthService());
}
