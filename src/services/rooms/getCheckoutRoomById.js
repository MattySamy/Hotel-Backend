import { prisma } from '../../index.js';
import { okResponse, badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getCheckoutRoomById(req, res, next) {
    try {
        const {
            id
        } = req.params;
        const checkoutRoom = await prisma.checkedOutRooms.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!checkoutRoom) {
            return badRequestResponse(res, 'No checkout room found');
        }
        return okResponse(res, 'Checkout room retrieved successfully', checkoutRoom);
    } catch (err) {
        next(err);
    }
}