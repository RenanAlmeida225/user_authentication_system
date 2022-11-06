import { LoginController } from '../controller/loginController';
import { makeAuthService } from './makeAuthService';

export function makeLoginController() {
	return new LoginController(makeAuthService());
}
