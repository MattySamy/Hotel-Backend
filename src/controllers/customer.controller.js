import { Router } from 'express';
import * as UserService from '../services/user/index.js';
import createUserSchema from '../helpers/schemas/createUser.js';
import joiMiddleware from '../helpers/middlewares/joiMiddleware.js';
const router = Router();

router.post('/', joiMiddleware(createUserSchema), UserService.createUser);
router.get('/', UserService.getUsers);
router.get('/id', UserService.getUserById);
router.patch('/', UserService.updateUser);
export default router;