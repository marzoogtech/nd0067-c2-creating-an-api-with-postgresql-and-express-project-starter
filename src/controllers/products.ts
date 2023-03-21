import { Request, Response } from "express";
import { Product, ProductModel } from "../models/Product";

const Product = new ProductModel();

export const index = async (req: Request, res: Response) => {
    try {
        const products = await Product.index();
        res.send(products);
    } catch (err) {
        res.status(401).json(err);
    }
};

export const show = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = await Product.show(id);
        return res.send(product);
    } catch (err) {
        res.status(404).json(err);
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { productName, price, category } = req.body;
        if(!productName || !price) {
            return res
                .status(400)
                .send(
                    `Error, missing or malformed parameters. (name, price) are requeired.\nname:${productName}\nprice:${price}`
                );
        }
        const product: Product = { productName, price, category };
        const createdProduct = await Product.create(product);
        return res.json(createdProduct);
    } catch (err) {
        res.status(500).send(`Faild to create product. Error ${err}`);
    }
};
