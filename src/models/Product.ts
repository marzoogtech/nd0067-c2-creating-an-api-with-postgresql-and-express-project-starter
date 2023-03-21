import client from '../database';

export type Product = {
  id?: number;
  productName: string;
  price: number;
  category?: string;
}

export class ProductModel {
  async index(): Promise<Product[]> {
    try{
      const conn = await client.connect();
      const sql = 'SELECT *  FROM products';
      const products = await conn.query(sql);
      conn.release();
      return products.rows;   
    } catch (err){
      throw new Error(`${err}`);
    }
  }

  async show(id:number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const product = await conn.query(sql, [id]);
      conn.release();
      return product.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO products ("productName", price, category) VALUES ($1, $2, $3) RETURNING *';
      const createdProduct = await conn.query(sql, [
        product.productName,
        product.price,
        product.category
      ])
      conn.release();
      return createdProduct.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  
}

