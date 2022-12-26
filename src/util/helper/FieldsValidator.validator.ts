import { FieldsValidator } from './protocol';
import validator from 'validator';

export class FieldsValidatorValidator implements FieldsValidator {
	isEmail(email: string): boolean {
		return validator.isEmail(email);
	}
}
