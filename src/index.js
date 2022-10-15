import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import logger from './helpers/middlewares/logger.js';
import errorHandler from './helpers/middlewares/errorHandler.js';
import authRouter from './controllers/auth.controller.js';
import customerRouter from './controllers/customer.controller.js';
import roomRouter from './controllers/room.controller.js';
import creditRouter from './controllers/credit.controller.js';
import registerStrategies from './helpers/functions/registerStrategies.js';
const prisma = new PrismaClient();
dotenv.config();

const app = express();
registerStrategies();

// -- Middlewares --
app.use(express.json());
app.use(logger);

// -- Routes --
app.use('/auth', authRouter);
app.use('/customer', customerRouter);
app.use('/room', roomRouter);
app.use('/credit', creditRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(
        `Server is listening on port http://127.0.0.1:${process.env.PORT}`,
    );
});

export { prisma };