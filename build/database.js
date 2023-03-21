"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, TEST_DB_NAME, ENV } = process.env;
const client = new pg_1.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: ENV === 'dev' ? DB_NAME : TEST_DB_NAME,
});
exports.default = client;
