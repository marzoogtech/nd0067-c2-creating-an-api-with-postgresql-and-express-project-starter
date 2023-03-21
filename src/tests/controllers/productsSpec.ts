import supertest from "supertest";
import app from "../../server";
import { Product } from "../../models/Product";
import { User } from "../../models/User";

const request = supertest(app);

describe('Testing Endpoint: /api/products', () => {

    const user: User = {
        id: 'prodtestapi',
        firstName: 'userfirst',
        lastName: 'userLast',
        password: 'marzoog123'
    };

    const prod: Product = {
        productName: 'test product',
        price: 222,
        category: 'test category',
    };
    let token: string;

    beforeAll(async () => {
        const tokenReq = await request.post('/api/users').send(user);
        token = tokenReq.body;
    });

    it('Create a products', async () => {
        const newProdReq: any = await request
            .post('/api/products')
            .set('Authorization', 'bearar ' + token)
            .send(prod)
        const price = Number(newProdReq.body.price)
        const { productName, category } = newProdReq.body
        expect({ productName, price, category }).toEqual({
            productName: prod.productName,
            price: prod.price,
            category: prod.category
        });
    })

    it('Show all the products', async () => {
        await request
            .get('/api/products')
            .expect(200);
    });

    it('Show a products', async() => {
        await request
            .get('/api/products/1')
            .expect(200);
    });
    
});


