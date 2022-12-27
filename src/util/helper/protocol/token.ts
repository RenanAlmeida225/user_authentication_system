export interface Token {
	generateToken(playload: string): string;
	verifyToken(token: string): string | null;
}
