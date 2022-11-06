import { RegisterController } from '../controller/registerController';
import { makeAuthService } from './makeAuthService';

export function makeRegisterController() {
	return new RegisterController(makeAuthService());
}
