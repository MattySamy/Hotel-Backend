import { prisma } from '../../index.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getAllAvailableRooms(req, res, next) {
    try {
        const rooms = await prisma.rooms.findMany({
            where: {
                roomStatus: 'available',
            },
        });
        return okResponse(res, 'All available Rooms are fetched successfully', rooms);
    } catch (err) {
        next(err);
    }
}