import { Router } from 'express';
import * as RoomService from '../services/rooms/index.js';
import addRoomSchema from '../helpers/schemas/addRoom.js';
import reserveRoomSchema from '../helpers/schemas/reserveRoom.js';
import checkoutRoomSchema from '../helpers/schemas/checkoutRoom.js';
import joiMiddleware from '../helpers/middlewares/joiMiddleware.js';
import authenticateWithJWT from '../helpers/functions/authenticateWithJWT.js';
const router = Router();

router.post(
    '/add',
    authenticateWithJWT,
    joiMiddleware(addRoomSchema),
    RoomService.addRoom,
);
router.post(
    '/reserve',
    authenticateWithJWT,
    joiMiddleware(reserveRoomSchema),
    RoomService.reserveRoom,
);
router.get('/all', RoomService.getAllRooms);
router.get('/:id', RoomService.getRoomById);
router.delete('/:id', RoomService.deleteRoom);
router.post(
    '/checkout',
    authenticateWithJWT,
    joiMiddleware(checkoutRoomSchema),
    RoomService.checkoutRoom,
);
router.get('/checkout/all', authenticateWithJWT, RoomService.getAllCheckouts);
router.get('/checkout/:id', RoomService.getCheckoutRoomById);
router.patch('/:id', RoomService.updateRoom);
router.patch('/reserve/:id', RoomService.extendStay);
router.get('/all/a', RoomService.getAllAvailableRooms);
router.get('/all/r', authenticateWithJWT, RoomService.getAllReservations);
router.get('/all/r/:id', RoomService.getReservationById);
export default router;