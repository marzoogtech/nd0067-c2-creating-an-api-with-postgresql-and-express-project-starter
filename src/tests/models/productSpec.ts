import { Product, ProductModel } from "../../models/Product";

const productModel = new ProductModel()

let testProduct: Product = {
    productName: 'Test Product',
    price: 224,
    category: 'Test Catagory'
}
let testProduct2: Product = {
    productName: 'Test Product 2',
    price: 225,
    category: 'Test Catagory'
}

describe('Product Model Test', () => {
    it('Create a product',async () => {
        const product = await productModel.create(testProduct);
        const { productName, category } = product;
        const price = Number(product.price);
        expect({ productName, price, category }).toEqual({
            productName: testProduct.productName,
            price: testProduct.price,
            category: testProduct.category
        })
    });

    it('Show a product', async () =>{
        const product = await productModel.show(1);
        const id = Number(product.id); 
        expect(id).toBe(1);
    });

    it('Show all products', async () => {
        const products = await productModel.index();
        expect(Array.isArray(products)).toBe(true);
    });
});


