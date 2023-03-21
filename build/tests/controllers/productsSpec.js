"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Testing Endpoint: /api/products', () => {
    const user = {
        id: 'prodtestapi',
        firstName: 'userfirst',
        lastName: 'userLast',
        password: 'marzoog123'
    };
    const prod = {
        productName: 'test product',
        price: 222,
        category: 'test category',
    };
    let token;
    beforeAll(async () => {
        const tokenReq = await request.post('/api/users').send(user);
        token = tokenReq.body;
    });
    it('Create a products', async () => {
        const newProdReq = await request
            .post('/api/products')
            .set('Authorization', 'bearar ' + token)
            .send(prod);
        const price = Number(newProdReq.body.price);
        const { productName, category } = newProdReq.body;
        expect({ productName, price, category }).toEqual({
            productName: prod.productName,
            price: prod.price,
            category: prod.category
        });
    });
    it('Show all the products', async () => {
        await request
            .get('/api/products')
            .expect(200);
    });
    it('Show a products', async () => {
        await request
            .get('/api/products/1')
            .expect(200);
    });
});
