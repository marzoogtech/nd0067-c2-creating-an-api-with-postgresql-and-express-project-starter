"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { PEPPER, } = process.env;
class UserModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const users = await conn.query(sql);
            conn.release();
            return users.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const user = await conn.query(sql, [id]);
            conn.release();
            return user.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async create(user) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (id, "firstName", "lastName", password) VALUES ($1, $2, $3, $4) RETURNING *';
            const hashedPassword = bcrypt_1.default.hashSync(user.password + PEPPER, 12);
            const result = await conn.query(sql, [
                user.id,
                user.firstName,
                user.lastName,
                hashedPassword
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.UserModel = UserModel;
