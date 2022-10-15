import { prisma } from '../../index.js';
import { badRequestResponse, okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function updateRoom(req, res, next) {
    try {
        const { id } = req.params;
        const { description, roomType, roomStatus, DayCost } = req.body;
        const room = await prisma.rooms.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!room) {
            return badRequestResponse(res, 'Room not found');
        }
        const updated_Room = await prisma.rooms.update({
            where: {
                id: parseInt(id),
            },
            data: {
                Description: description ? description : room.Description,
                roomType: roomType ? roomType : room.roomType,
                roomStatus: roomStatus ? roomStatus : room.roomStatus,
                DayCost: DayCost ? DayCost : room.DayCost,
            },
        });
        return okResponse(res, 'Room updated successfully', updated_Room);
    } catch (err) {
        next(err);
    }
}