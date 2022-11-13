import { EmailValidator } from './protocol';
import validator from 'validator';

export class ValidateEmail implements EmailValidator {
	isEmail(email: string): boolean {
		return validator.isEmail(email);
	}
}
