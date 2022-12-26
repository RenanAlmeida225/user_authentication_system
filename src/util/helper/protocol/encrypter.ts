export interface Encrypter {
	genarateHash(value: string): string;
	compareHash(value: string, hashedValue: string): boolean;
}
