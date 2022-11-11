import { RegisterController } from '../../presentation/controller';
import { makeAuthService } from './';

export function makeRegisterController() {
	return new RegisterController(makeAuthService());
}
