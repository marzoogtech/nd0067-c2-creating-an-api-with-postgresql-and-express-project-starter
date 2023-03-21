import { Router } from 'express';
import { 
  index,
  show,
  create,
} from '../../controllers/users';
import { auth } from '../../middleware/auth';

const router = Router();

router.get('/', auth, index);
router.get('/:id', auth, show);
router.post('/', create);

export default router;
