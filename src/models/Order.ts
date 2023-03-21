import client from '../database';

export type Order = {
  id?: number;
  productIds: number[];
  productQtys: number[];
  userId: string;
  orderStatus: string;
}

export class OrderModel {
  async show(userId: string): Promise<Order>{
    try {
      const conn = await client.connect();
      const sql = `
        SELECT orders.id as id, product_id, product_qty, userId, orderStatus FROM orders
        INNER JOIN order_products ON orders.id = order_products.order_id WHERE
        userId = ($1) AND orders.orderstatus = 'active'
      `;
      const result = await conn.query(sql, [userId]);
      conn.release();
      const products = result.rows;
      const order = {} as Order;
      order.id = products[0].id;
      order.orderStatus = products[0].orderstatus;
      order.userId = products[0].userid;
      order.productQtys = [] as number[];
      order.productIds = [] as number[];
      for (const product of products) {
        order.productIds.push(Number(product.product_id));
        order.productQtys.push(Number(product.product_qty));
      }
      return order;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(userId: string) {
    try {
      const conn = await client.connect();
      const orderStatus = 'active';
      const sql = `INSERT INTO orders(userId, orderstatus) VALUES ($1, $2) RETURNING *`
      const result = await conn.query(sql, [userId, orderStatus]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async addProduct(orderId: number, productId: number, productQty: number) {
    try {
      const conn = await client.connect();
      const sql = `
        INSERT INTO order_products (order_id, product_id, product_qty)
        VALUES ($1, $2, $3) RETURNING*
        `; 
      const result = await conn.query(sql, [orderId, productId, productQty]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
