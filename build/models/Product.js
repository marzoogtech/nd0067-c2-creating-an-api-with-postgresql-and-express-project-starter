"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT *  FROM products';
            const products = await conn.query(sql);
            conn.release();
            return products.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const product = await conn.query(sql, [id]);
            conn.release();
            return product.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async create(product) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products ("productName", price, category) VALUES ($1, $2, $3) RETURNING *';
            const createdProduct = await conn.query(sql, [
                product.productName,
                product.price,
                product.category
            ]);
            conn.release();
            return createdProduct.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.ProductModel = ProductModel;
