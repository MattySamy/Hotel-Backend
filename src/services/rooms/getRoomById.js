import { prisma } from '../../index.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getRoomById(req, res, next) {
    try {
        const { id } = req.params;
        const room = await prisma.rooms.findUnique({
            where: {
                id: parseInt(id),
            }
        });
        return okResponse(res, 'Room fetched successfully', room);
    } catch (err) {
        next(err);
    }
}