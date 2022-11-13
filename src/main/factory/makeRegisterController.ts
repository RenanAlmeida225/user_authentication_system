import { RegisterController } from '../../presentation/controller';
import { ValidateEmail } from '../../util/helper';
import { makeAuthService } from './';

export function makeRegisterController() {
	return new RegisterController(makeAuthService(), new ValidateEmail());
}
