export interface Encrypter {
	genHash(): string;
	compare(password: string, PasswordHash: string): boolean;
}
