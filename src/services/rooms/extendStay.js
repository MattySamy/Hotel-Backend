import { prisma } from '../../index.js';
import { badRequestResponse, okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function extendStay(req, res, next) {
    try {
        const { id } = req.params;
        let { endAt } = req.body;
        const reservedRoom = await prisma.reservedRooms.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!reservedRoom) {
            return badRequestResponse(res, 'No reserved room found');
        }
        const extendedReservedRoom = await prisma.reservedRooms.update({
            where: {
                id: parseInt(id),
            },
            data: {
                endAt: new Date(endAt),
            },
        });
        return okResponse(res, 'Reserved room updated successfully', extendedReservedRoom);
    } catch (err) {
        next(err);
    }
}
//Extended Stay is by (id of reservation) the admin made.