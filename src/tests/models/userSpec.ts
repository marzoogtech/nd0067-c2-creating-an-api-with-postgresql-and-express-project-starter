import { User, UserModel } from "../../models/User";

const userModel = new UserModel();

const testUser: User = {
    id:'marzoogtest',
    firstName: 'Marzoog',
    lastName: 'AlGhazwi',
    password: 'marzoog123'
};


describe('User Model Test', () => {
    it('Create a user', async () => {
        const user = await userModel.create(testUser);
        const { id, firstName, lastName } = user;
        expect({ id, firstName, lastName }).toEqual({
            id: testUser.id,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
        });
    });

    it('Show a user', async () => {
        const user = await userModel.show(testUser.id);
        const { id, firstName, lastName } = user;
        expect({ id, firstName, lastName }).toEqual({
            id: testUser.id,
            firstName: testUser.firstName,
            lastName: testUser.lastName
        });
    });
});