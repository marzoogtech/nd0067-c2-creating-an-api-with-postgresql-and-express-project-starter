"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
/*
    -Index [token]: api/users (GET)
    -Show [token]: api/users/:id (GET)
    -Create [Returns a token]: api/user (POST)
*/
describe('Testing Users Endpoints: /api/users ', () => {
    const user = {
        id: 'userEndpoint',
        firstName: 'marzoog',
        lastName: 'alghazwi',
        password: 'marzoog123'
    };
    const tokenUser = {
        id: 'tokenUser',
        firstName: 'token',
        lastName: 'altoken',
        password: 'tokenToken123'
    };
    let token;
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
});
