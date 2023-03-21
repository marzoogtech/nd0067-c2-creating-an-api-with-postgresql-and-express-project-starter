import { Request, Response } from 'express';
import { Order, OrderModel } from '../models/Order';
import { UserRequest } from '../interfaces/UserRequest';

const Order = new OrderModel;

export const show = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const result = await Order.show(userId);
    res.send(result);
  } catch (err) {
    res.status(404).json(err);
  }
}; 

export const create = async (req: Request, res: Response) => {
  try {
    const  { userId }  = req as UserRequest;
    const result = await Order.create(userId as string);
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { orderId, productId, productQty } = req.body;
    const result = await Order.addProduct(orderId, productId, productQty);
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
}
