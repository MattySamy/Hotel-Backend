import { prisma } from '../../index.js';
import { okResponse, badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
export async function createUser(req, res, next) {
    try {
        const { id, name, email, phone } = req.body;
        const idCheck = await prisma.customer.findUnique({
            where: {
                id: id,
            },
        });
        if (idCheck) {
            return badRequestResponse(res, 'Customer ID already exists');
        }
        const checkEmail = await prisma.customer.findUnique({
            where: {
                email: email,
            },
        });
        if (checkEmail) {
            return badRequestResponse(res, 'Email already exists');
        }
        const newUser = await prisma.customer.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                id: id,
            },
        });
        return okResponse(res, 'User created successfully', newUser);
    } catch (err) {
        next(err);
    }
}