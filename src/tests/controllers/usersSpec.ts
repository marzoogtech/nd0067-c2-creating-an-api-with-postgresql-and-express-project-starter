import supertest from "supertest";
import { User } from "../../models/User";
import app from "../../server";

const request = supertest(app);

/*
    -Index [token]: api/users (GET)
    -Show [token]: api/users/:id (GET)
    -Create [Returns a token]: api/user (POST)
*/

describe('Testing Users Endpoints: /api/users ', () => {

    const user: User = {
        id: 'userEndpoint',
        firstName: 'marzoog',
        lastName: 'alghazwi',
        password: 'marzoog123'
    };

    const tokenUser: User = {
        id: 'tokenUser',
        firstName: 'token',
        lastName: 'altoken',
        password: 'tokenToken123'
    };

    let token: string;

    beforeAll(async () => {
        const tokenReq = await request.post('/api/users').send(tokenUser);
        token = tokenReq.body;
    });

    it('Create a new user', async () => {
        await request
            .post('/api/users')
            .send(user)
            .expect(200);
    });

    it('Show all users', async () => {
        await request
            .get('/api/users/')
            .set('Authorization', 'bearar ' + token)
            .expect(200);
    });

    it('Show a user', async () => {
        await request
            .get(`/api/users/${user.id}`)
            .set('Authorization', 'bearar ' + token)
            .expect(200);
    });

})