import { prisma } from '../../index.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getUserById(req, res, next) {
    try {
        const { id } = req.body;
        const user = await prisma.customer.findUnique({
            where: {
                id: id,
            },
            select: {
                name: true,
                email: true,
                phone: true,
            }
        });
        return okResponse(res, 'The User is fetched successully!', user);
    } catch (err) {
        next(err);
    }
}