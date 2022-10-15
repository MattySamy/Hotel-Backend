import { prisma } from '../../index.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getUsers(req, res, next) {
    try {
        const users = await prisma.customer.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
            },
        });
        return okResponse(res, 'All Users Are Fetched !', users);
    } catch (err) {
        next(err);
    }
}