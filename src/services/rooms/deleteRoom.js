import { prisma } from '../../index.js';
import { badRequestResponse, okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function deleteRoom(req, res, next) {
    try {
        const { id } = req.params;
        const room = await prisma.rooms.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!room) {
            return badRequestResponse(res, 'Room not found');
        }
        await prisma.rooms.delete({
            where: {
                id: parseInt(id),
            },
        });
        return okResponse(res, 'Room deleted successfully');
    } catch (err) {
        next(err);
    }
}