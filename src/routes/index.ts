import { Router } from 'express';
import productsRouter from './api/products';
import usersRouter from './api/users';
import ordersRouter from './api/orders';

const router = Router();

router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);

export default router;
