import { prisma } from '../../index.js';
import { okResponse, badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
export async function reserveRoom(req, res, next) {
    try {
        const { id } = req.user;
        let { roomId, customerId, startAt, endAt } = req.body;
        const room = await prisma.rooms.findUnique({
            where: {
                id: parseInt(roomId),
            },
        });
        if (!room) {
            return badRequestResponse(res, 'Room not found');
        }
        const customerId1 = await prisma.customer.findUnique({
            where: {
                id: customerId,
            }
        });
        const customerId2 = await prisma.reservedRooms.findFirst({
            where: {
                customerId: customerId,
            }
        });
        if (customerId1 === customerId2) {
            return badRequestResponse(res, "there's already a customer reserved this room ");
        }
        if (room.roomStatus === 'reserved') {
            return badRequestResponse(res, 'Room already reserved for you');
        }
        if (room.roomStatus === 'disabled') {
            return badRequestResponse(res, 'Room is disabled');
        }
        if (startAt > endAt) {
            return badRequestResponse(res, 'Start date must be before end date');
        }
        if (customerId === customerId1) {
            return badRequestResponse(res, 'Customer already reserved this room');
        }
        const reservation = await prisma.reservedRooms.create({
            data: {
                adminId: parseInt(id),
                roomId: parseInt(roomId),
                customerId: customerId,
                startAt: startAt,
                endAt: endAt,
            },
        });
        await prisma.rooms.update({
            where: {
                id: roomId,
            },
            data: {
                roomStatus: 'reserved',
            },
        });
        return okResponse(res, "Room reserved successfully", reservation);
    } catch (err) {
        next(err);
    }
}