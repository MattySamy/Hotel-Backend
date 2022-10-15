import { prisma } from '../../index.js';
import { badRequestResponse, okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getAllReservations(req, res, next) {
    try {
        const { id } = req.user;
        const reservations = await prisma.reservedRooms.findMany({
            where: {
                adminId: parseInt(id),
            },
            select: {
                id: true,
                startAt: true,
                room: {
                    select: {
                        id: true,
                        DayCost: true,
                        roomStatus: true,
                        roomType: true,
                    }
                },
                customer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
            }
        });
        if (!reservations) {
            return badRequestResponse(res, 'No reservations found');
        }
        return okResponse(res, ' All reservations ', reservations);
    } catch (error) {
        next(error);
    }
}