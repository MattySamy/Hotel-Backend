import { prisma } from '../../index.js';
import { okResponse, badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getAllCheckouts(req, res, next) {
    try {
        const { id } = req.user;
        const checkouts = await prisma.checkedOutRooms.findMany({
            where: {
                adminId: parseInt(id),
            },
            select: {
                id: true,
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
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                startAt: true,
                endAt: true,
                Feedback: true,
                Cost: true,
            }
        });
        if (!checkouts) {
            return badRequestResponse(res, 'No checkouts found');
        }
        return okResponse(res, 'Checkouts retrieved successfully', checkouts);
    } catch (err) {
        next(err);
    }
}