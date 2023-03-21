import { Router } from 'express';
import {
    index,
    show,
    create
} from '../../controllers/products'
import { auth } from '../../middleware/auth';

const router = Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', auth, create);

export default router;
