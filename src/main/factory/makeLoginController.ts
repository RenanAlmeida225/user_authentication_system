import { LoginController } from '../../presentation/controller';
import { ValidateEmail } from '../../util/helper';
import { makeAuthService } from './';

export function makeLoginController() {
	return new LoginController(makeAuthService(), new ValidateEmail());
}
