import { Field, FieldPacket, RowDataPacket } from 'mysql2/promise';
import { MissingParamError } from '../../util/error';
import { User } from '../protocol/user';
import { UserRepository } from '../protocol/userRepository';
import connection from './connection';

export class UserRepo implements UserRepository {
	async save(user: User): Promise<null> {
		if (!user.id || !user.userName || !user.email || !user.password) {
			throw new MissingParamError();
		}
		const conn = await connection();
		const sql = `INSERT INTO user ( 
            id,
            user_name,
            user_email,
            user_password) 
            VALUES (?, ?, ?, ?);`;
		await conn.execute(sql, [
			user.id,
			user.userName,
			user.email,
			user.password
		]);
		await conn.end();
		return null;
	}

	async load(email: string): Promise<User> {
		if (!email) {
			throw new MissingParamError();
		}
		const conn = await connection();
		const sql = 'SELECT * FROM user WHERE user_email = ?';
		const [field]: [any, Array<FieldPacket>] = await conn.execute(sql, [email]);
		await conn.end();
		const user: User = field[0];
		return user;
	}
}

/* 
id,
user_name,
user_email,
user_password 
     */
