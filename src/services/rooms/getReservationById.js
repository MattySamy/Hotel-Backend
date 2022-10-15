import { prisma } from '../../index.js';
import { okResponse, badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getReservationById(req, res, next) {
    try {
        const { id } = req.params;
        const reservation = await prisma.reservedRooms.findUnique({
            where: {
                id: parseInt(id),
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
        if (!reservation) {
            return badRequestResponse(res, 'No reservation found');
        }
        return okResponse(res, 'Reservation retrieved successfully', reservation);
    } catch (err) {
        next(err);
    }
}