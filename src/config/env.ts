import { config } from 'dotenv';
config();

export const env = {
	secret: process.env.SECRET || '',
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB,
	password: process.env.DB_PASSWORD
};
