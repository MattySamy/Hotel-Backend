import { prisma } from '../../index.js';
import { badRequestResponse, okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function checkoutRoom(req, res, next) {
    try {
        const { id } = req.user;
        let { roomId, customerId, Feedback, cost, startAt, endAt } = req.body;
        const room = await prisma.rooms.findUnique({
            where: {
                id: parseInt(roomId),
            },
        });
        if (!room) {
            return badRequestResponse(res, 'Room not found');
        }
        const customer = await prisma.customer.findUnique({
            where: {
                id: customerId,
            }
        });
        const reservedRoom = await prisma.reservedRooms.findFirst({
            where: {
                customerId: customerId,
            },
        });
        if (!customer) {
            return badRequestResponse(res, 'Customer not found');
        }
        if (!reservedRoom) {
            return badRequestResponse(res, 'No reserved room found');
        }
        if (room.roomStatus === 'disabled') {
            return badRequestResponse(res, 'Room is disabled');
        }
        if (startAt > endAt) {
            return badRequestResponse(res, 'Start date must be before end date');
        }
        if (room.roomStatus === 'available') {
            return badRequestResponse(res, 'Room already available and can not be checked out');
        }
        endAt = new Date(reservedRoom.endAt);
        const daySpent = Math.floor(Math.abs(new Date(endAt) - new Date(startAt)) / (1000 * 60 * 60 * 24));
        cost = Math.floor(daySpent * room.DayCost);
        let message1 = `You have checked out from room ${room.id} and spent ${daySpent} days in the room`;
        let message = '';
        let totalCost = cost;
        let discount = 0;
        if (totalCost <= 800) {
            cost = totalCost;
            message = message1 + " and Sorry, there is no discount to apply.";
        } else if (totalCost > 800 && totalCost <= 1500) {
            discount = (totalCost * 10) / 100;
            cost = totalCost - discount;
            message = message1 + " and Congrats, You've got 10% discount on the total Purchase!" + " Total Cost: " + totalCost + " Discount: " + discount + " Total Cost after discount: " + cost;
        } else if (totalCost > 1500 && totalCost <= 2500) {
            discount = (totalCost * 15) / 100;
            cost = totalCost - discount;
            message = message1 + " Congrats, You've got 15% discount on the total Purchase!" + " Total Cost: " + totalCost + " Discount: " + discount + " Total Cost after discount: " + cost;
        } else if (totalCost > 2500 && totalCost <= 5000) {
            discount = (totalCost * 20) / 100;
            cost = totalCost - discount;
            message = message1 + " Congrats, You've got 20% discount on the total Purchase!" + " Total Cost: " + totalCost + " Discount: " + discount + " Total Cost after discount: " + cost;
        } else {
            discount = (totalCost * 30) / 100;
            cost = totalCost - discount;
            message = message1 + " Congrats, You've got 30% discount on the total Purchase!" + " Total Cost: " + totalCost + " Discount: " + discount + " Total Cost after discount: " + cost;
        }
        endAt = new Date(reservedRoom.endAt);
        const checkoutRoom = await prisma.checkedOutRooms.create({
            data: {
                adminId: parseInt(id),
                roomId: parseInt(roomId),
                customerId: customerId,
                Feedback: Feedback,
                Cost: Math.floor(cost),
                startAt: startAt,
                endAt: endAt,
            },
        });
        const result = await prisma.checkedOutRooms.findUnique({
            where: {
                id: checkoutRoom.id,
            },
            select: {
                startAt: true,
                endAt: true,
                roomId: true,
                room: {
                    select: {
                        DayCost: true,
                        Description: true,
                        roomType: true,
                    }
                },
                customer: {
                    select: {
                        email: true,
                        name: true,
                        phone: true,
                    }
                },
                Feedback: true,
                Cost: true,
            }
        });
        await prisma.rooms.update({
            where: {
                id: parseInt(roomId),
            },
            data: {
                roomStatus: 'available',
            },
        });
        return okResponse(res, message, {
            ...result,
            daySpent,
        });
    } catch (err) {
        next(err);
    }
}