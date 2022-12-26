import { RegisterController } from '../../presentation/controller';
import { FieldsValidatorValidator } from '../../util/helper';
import { makeAuthService } from './';

export function makeRegisterController() {
	return new RegisterController(
		makeAuthService(),
		new FieldsValidatorValidator()
	);
}
