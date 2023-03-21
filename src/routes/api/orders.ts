import { Router } from 'express';
import { show, create, addProduct } from '../../controllers/orders'
import { auth } from '../../middleware/auth';

const router = Router(); 

router.get('/:userId', auth, show);
router.post('/', auth, create)
router.put('/', auth, addProduct)

export default router;
