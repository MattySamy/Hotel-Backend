import { Router } from 'express';
import * as PaymentService from '../services/creditCard/index.js';
import createPaymentSchema from '../helpers/schemas/createCreditCard.js';
import joiMiddleware from '../helpers/middlewares/joiMiddleware.js';
import authenticateWithJWT from '../helpers/functions/authenticateWithJWT.js';
const router = Router();

router.post('/', authenticateWithJWT, joiMiddleware(createPaymentSchema), PaymentService.createCreditCard);
export default router;