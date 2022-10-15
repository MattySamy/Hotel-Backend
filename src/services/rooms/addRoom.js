import { prisma } from '../../index.js';
import {
    badRequestResponse,
    okResponse,
} from '../../helpers/functions/ResponseHandler.js';
export async function addRoom(req, res, next) {
    try {
        const { id } = req.user;
        const { DayCost, Description, roomType, roomStatus } = req.body;
        if (!DayCost || !Description || !roomType || !roomStatus) {
            return badRequestResponse(res, 'Please fill all fields');
        }
        if (isNaN(DayCost)) {
            return badRequestResponse(res, 'Day cost must be a number');
        }
        const room = await prisma.rooms.create({
            data: {
                adminId: id,
                DayCost: DayCost,
                Description: Description,
                roomStatus: roomStatus,
                roomType: roomType,
            },
        });
        return okResponse(res, 'Room added successfully', room);
    } catch (err) {
        next(err);
    }
}