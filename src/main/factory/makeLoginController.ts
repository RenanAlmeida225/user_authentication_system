import { LoginController } from '../../presentation/controller';
import { FieldsValidatorValidator } from '../../util/helper';
import { makeAuthService } from './';

export function makeLoginController() {
	return new LoginController(makeAuthService(), new FieldsValidatorValidator());
}
