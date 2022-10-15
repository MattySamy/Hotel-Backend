import { prisma } from '../../index.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getAllRooms(req, res, next) {
    try {
        const rooms = await prisma.rooms.findMany();
        return okResponse(res, 'All Rooms are fetched successfully', rooms);
    } catch (err) {
        next(err);
    }
}