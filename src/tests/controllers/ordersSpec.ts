import supertest from "supertest";
import { Product } from "../../models/Product";
import { User } from "../../models/User";
import app from "../../server";


const request = supertest(app);

/*
    - Current order by user '/api/orders/:userId [GET]
    - Create an order '/api/orders' [POST]
    - Add product to order 'api/orders' [PUT]
*/


describe('Testing Orders Endpoints: /api/orders', () =>{
    const orderUser: User = {
        id: 'orderUser',
        firstName: 'Marzoog',
        lastName: 'AlGhazwi',
        password: 'marzoog123',
    };

    const prod1: Product = {
        productName: 'prod1',
        price: 111,
        category: 'Test products',
    };

    let token: string;
    let testProd: Product;
    let createdOrderId: number;

    beforeAll(async() => {
        const tokenReq = await request.post('/api/users').send(orderUser);
        token = tokenReq.body;
        const prodReq = await request
            .post('/api/products')
            .set('Authorization', 'bearar ' + token)
            .send(prod1);
        testProd = prodReq.body as unknown as Product;
    });

    it('Create an order',async () => {
        const createOrderReq =  await request
            .post('/api/orders')
            .set('Authorization', 'bearar ' + token)
            .expect(200);
        createdOrderId = Number(createOrderReq.body.id);
    });

    it('Add a product to an order', async () => {
        const prodId = testProd.id;
        const prodQty = 10;
        await request
            .put('/api/orders')
            .set('Authorization', 'bearar ' + token)
            .send({ 
                orderId: createdOrderId,
                productId: prodId,
                productQty: prodQty
            })
            .expect(200);
    });

    it('Show the current order by user', async () => {
        await request
            .get(`/api/orders/${orderUser.id}`)
            .set('Authorization', 'bearar ' + token)
            .expect(200); 
    });
});