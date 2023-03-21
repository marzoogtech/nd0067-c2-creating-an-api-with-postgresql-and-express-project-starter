"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
/*
    - Current order by user '/api/orders/:userId [GET]
    - Create an order '/api/orders' [POST]
    - Add product to order 'api/orders' [PUT]
*/
describe('Testing Orders Endpoints: /api/orders', () => {
    const orderUser = {
        id: 'orderUser',
        firstName: 'Marzoog',
        lastName: 'AlGhazwi',
        password: 'marzoog123',
    };
    const prod1 = {
        productName: 'prod1',
        price: 111,
        category: 'Test products',
    };
    let token;
    let testProd;
    let createdOrderId;
    beforeAll(async () => {
        const tokenReq = await request.post('/api/users').send(orderUser);
        token = tokenReq.body;
        const prodReq = await request
            .post('/api/products')
            .set('Authorization', 'bearar ' + token)
            .send(prod1);
        testProd = prodReq.body;
    });
    it('Create an order', async () => {
        const createOrderReq = await request
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
