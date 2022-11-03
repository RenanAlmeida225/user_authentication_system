export interface VerifyPasswordHash {
	verified(password: string, passwordHash: string): boolean;
}
