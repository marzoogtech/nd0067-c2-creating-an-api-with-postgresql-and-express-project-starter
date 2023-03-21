"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.create = exports.show = void 0;
const Order_1 = require("../models/Order");
const Order = new Order_1.OrderModel;
const show = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(userId);
        const result = await Order.show(userId);
        res.send(result);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
exports.show = show;
const create = async (req, res) => {
    try {
        const { userId } = req;
        const result = await Order.create(userId);
        res.send(result);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.create = create;
const addProduct = async (req, res) => {
    try {
        const { orderId, productId, productQty } = req.body;
        const result = await Order.addProduct(orderId, productId, productQty);
        res.send(result);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.addProduct = addProduct;
