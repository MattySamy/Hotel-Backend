import { prisma } from '../../index.js';
import { badRequestResponse, okResponse } from '../../helpers/functions/ResponseHandler.js';
import bcrypt from 'bcrypt';
export async function createCreditCard(req, res, next) {
    try {
        const { id } = req.user;
        const {
            customerId,
            creditType,
            creditNumber,
            expiryDate,
            cvv,
            name,
            address,
            city,
            state,
            zip,
            country,
            email,
            balance,
        } = req.body;
        // const checkCreditCard3 = creditNumber;
        if (!creditType || !creditNumber || !expiryDate || !cvv || !name || !address || !city || !state || !zip || !country) {
            return badRequestResponse(res, 'Please fill all fields');
        }
        if (creditType !== 'visa' && creditType !== 'mastercard' && creditType !== 'discover' && creditType !== 'americanexpress' && creditType !== 'dinersclub' && creditType !== 'jcb') {
            return badRequestResponse(res, 'Credit type must be visa, mastercard, discover, americanexpress, dinersclub or jcb');
        }
        // if (checkCreditCard3) {
        //     return badRequestResponse(res, 'Credit card already exists with this credit number');
        // }
        const encryptedCreditNumber = await bcrypt.hash(creditNumber, 16);
        const encryptedCvv = await bcrypt.hash(cvv, 3);
        const checkoutCost = await prisma.checkedOutRooms.findFirst({
            where: {
                customerId: customerId,
            },
            select: {
                Cost: true,
            },
        });
        const checkCreditCard = await prisma.creditCard.findUnique({
            where: {
                customerId: customerId,
            },
        });
        if (!checkoutCost) {
            return badRequestResponse(res, 'You have not checked out any room');
        }
        let totalBalance = balance;
        if (checkoutCost) {
            totalBalance = balance - checkoutCost.Cost;
            if (totalBalance < 0) {
                return badRequestResponse(res, 'Your Balance is not enough');
            }
            if (checkCreditCard) {
                return badRequestResponse(res, 'Credit card already exists with this customer id');
            }
        }
        const creditCard = await prisma.creditCard.create({
            data: {
                adminId: id,
                customerId: customerId,
                creditType: creditType,
                creditNumber: encryptedCreditNumber,
                expiryDate: expiryDate,
                cvv: encryptedCvv,
                name: name,
                address: address,
                city: city,
                state: state,
                zip: zip,
                country: country,
                email: email,
                balance: balance
            }
        });
        delete creditCard.creditNumber;
        delete creditCard.cvv;
        delete creditCard.customerId;
        return okResponse(res, 'Credit card created successfully ' + (totalBalance < balance ? ('and the Total Balance after checkout is ' + totalBalance) : ('and the checkout is free I hope you\'re happy :)')), {
            ...creditCard,
            totalBalance
        });
    } catch (err) {
        next(err);
    }
}