import {
    okResponse,
    unAuthorizedResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
import bcrypt from 'bcrypt';
import createAccessToken from '../../helpers/functions/createAccessToken.js';
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const admin = await prisma.admins.findUnique({
            where: {
                email,
            },
        });
        if (!admin) {
            return unAuthorizedResponse(res, 'Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return unAuthorizedResponse(res, 'Invalid email or password');
        }
        const newToken = await prisma.tokens.create({
            data: {
                userId: admin.id,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
        });
        const accessToken = createAccessToken(admin.id, newToken.id);
        delete admin.password;
        delete admin.is_logged_in;
        return okResponse(res, 'Logged in successfully', {
            ...admin,
            accessToken
        });
    } catch (err) {
        next(err);
    }
}