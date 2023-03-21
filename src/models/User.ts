import client from '../database';
import bcrybt from 'bcrypt';

export type User  = {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
}

const { PEPPER,  } = process.env;

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const users = await conn.query(sql);
      conn.release();
      return users.rows;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const user = await conn.query(sql, [id]);
      conn.release();
      return user.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO users (id, "firstName", "lastName", password) VALUES ($1, $2, $3, $4) RETURNING *'
      const hashedPassword = bcrybt.hashSync(user.password + PEPPER, 12);
      const result = await conn.query(sql, [
        user.id,
        user.firstName,
        user.lastName,
        hashedPassword
      ]);
      conn.release();
      return result.rows[0];
      
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

