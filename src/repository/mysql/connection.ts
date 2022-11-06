import { Connection, createConnection } from 'mysql2/promise';
import { env } from '../../config/env';

export default async (): Promise<Connection> => {
	return await createConnection({
		host: env.host,
		user: env.user,
		database: env.database,
		password: env.password
	});
};
