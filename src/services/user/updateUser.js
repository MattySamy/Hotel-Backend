import { prisma } from '../../index.js';
import { okResponse, badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
export async function updateUser(req, res, next) {
    try {
        const { id } = req.body;
        const { name, phone, email } = req.body;
        const user = await prisma.customer.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            return badRequestResponse(res, 'User not found');
        }
        const updatedUser = await prisma.customer.update({
            where: {
                id: id,
            },
            data: {
                id: id ? id : user.id,
                name: name ? name : user.name,
                phone: phone ? phone : user.phone,
                email: email ? email : user.email,
            },
        });
        if (!updatedUser) {
            return badRequestResponse(res, 'User not updated');
        }
        return okResponse(res, 'User updated successfully', updatedUser);
    } catch (err) {
        next(err);
    }
}