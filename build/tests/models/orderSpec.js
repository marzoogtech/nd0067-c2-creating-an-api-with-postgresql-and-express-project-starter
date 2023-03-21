"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("../../models/Order");
const User_1 = require("../../models/User");
const Product_1 = require("../../models/Product");
const orderModel = new Order_1.OrderModel();
const userModel = new User_1.UserModel();
const productModel = new Product_1.ProductModel();
const orderTestUser = {
    id: 'orderTestUser',
    firstName: 'marzoog',
    lastName: 'alghazwi',
    password: 'marzoog123'
};
const orderTestUser2 = {
    id: 'orderTestUser2',
    firstName: 'marzoog',
    lastName: 'alghazwi',
    password: 'marzoog123'
};
const prod1 = {
    productName: 'prod1',
    price: 1,
    category: 'test'
};
const prod2 = {
    productName: 'prod2',
    price: 2,
    category: 'test'
};
let testUser;
let testUser2;
let testProd1;
let testProd2;
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
        const addProd1 = await orderModel.addProduct(orderId, testProd1.id, 10);
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
        await orderModel.addProduct(orderId, testProd1.id, prod1Qty);
        await orderModel.addProduct(orderId, testProd2.id, prod2Qty);
        const order = await orderModel.show(testUser2.id);
        const { orderStatus, userId, productQtys } = order;
        expect({ orderStatus, userId, productQtys }).toEqual({
            orderStatus: "active",
            userId: testUser2.id,
            productQtys: [prod1Qty, prod2Qty]
        });
    });
});
