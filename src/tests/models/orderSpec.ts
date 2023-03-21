import { Order, OrderModel } from "../../models/Order";
import { User, UserModel } from "../../models/User";
import { Product, ProductModel } from "../../models/Product";

const orderModel = new OrderModel();
const userModel = new UserModel();
const productModel = new ProductModel();

const orderTestUser: User = {
    id: 'orderTestUser',
    firstName: 'marzoog',
    lastName: 'alghazwi',
    password: 'marzoog123'
};

const orderTestUser2: User = {
    id: 'orderTestUser2',
    firstName: 'marzoog',
    lastName: 'alghazwi',
    password: 'marzoog123'
};


const prod1: Product = {
    productName: 'prod1',
    price: 1,
    category: 'test'
};

const prod2: Product = {
    productName: 'prod2',
    price: 2,
    category: 'test'
};

let testUser: User;
let testUser2: User;
let testProd1: Product;
let testProd2: Product;


describe('Order Model Test', () => {
    beforeAll(async () => {
        testUser = await userModel.create(orderTestUser);
        testUser2 = await userModel.create(orderTestUser2);
        testProd1 = await productModel.create(prod1);
        testProd2 = await productModel.create(prod2);
    });
    
    it('Creat an order', async () => {
        const createdOrder = await orderModel.create(testUser.id);
        const userId = createdOrder.userid;
        expect(userId).toBe(testUser.id);
    });

    it('Add product to an order', async () => {
        const newOrder = await orderModel.create(testUser.id);
        const orderId = Number(newOrder.id);
        const addProd1 = await orderModel.addProduct(orderId, testProd1.id as number, 10);
        const { order_id, product_id, product_qty } = addProd1;
        expect({ order_id, product_id, product_qty }).toEqual({
            order_id: orderId + "",
            product_id: testProd1.id + "",
            product_qty: 10
        });
    });

    
    it('Show order of a user', async () => {
        const newOrder = await orderModel.create(testUser2.id);
        const orderId = Number(newOrder.id);
        const prod1Qty = 30;
        const prod2Qty = 40;
        await orderModel.addProduct(orderId, testProd1.id as number, prod1Qty);
        await orderModel.addProduct(orderId, testProd2.id as number, prod2Qty);
        const order = await orderModel.show(testUser2.id);
        const { orderStatus, userId, productQtys } = order;
        expect({ orderStatus, userId, productQtys }).toEqual({
            orderStatus: "active",
            userId: testUser2.id,
            productQtys: [prod1Qty, prod2Qty]
        })
    });


});