"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.show = exports.index = void 0;
const Product_1 = require("../models/Product");
const Product = new Product_1.ProductModel();
const index = async (req, res) => {
    try {
        const products = await Product.index();
        res.send(products);
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.index = index;
const show = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await Product.show(id);
        return res.send(product);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
exports.show = show;
const create = async (req, res) => {
    try {
        const { productName, price, category } = req.body;
        if (!productName || !price) {
            return res
                .status(400)
                .send(`Error, missing or malformed parameters. (name, price) are requeired.\nname:${productName}\nprice:${price}`);
        }
        const product = { productName, price, category };
        const createdProduct = await Product.create(product);
        return res.json(createdProduct);
    }
    catch (err) {
        res.status(500).send(`Faild to create product. Error ${err}`);
    }
};
exports.create = create;
