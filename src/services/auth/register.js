import {
    conflictResponse,
    okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
import bcrypt from 'bcrypt';
import createAccessToken from '../../helpers/functions/createAccessToken.js';
export async function register(req, res, next) {
    try {
        const { email, password, name, phone } = req.body;
        const checkEmail = await prisma.admins.findUnique({
            where: {
                email,
            },
        });
        if (checkEmail) {
            return conflictResponse(res, 'Email already exists');
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await prisma.admins.create({
            data: {
                email,
                password: encryptedPassword,
                name,
                phone,
            },
        });
        const newToken = await prisma.tokens.create({
            data: {
                userId: newAdmin.id,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
        });
        const accessToken = createAccessToken(newAdmin.id, newToken.id);
        delete newAdmin.password;
        return okResponse(res, 'User created successfully', {
            ...newAdmin,
            accessToken,
        });
    } catch (err) {
        next(err);
    }
}