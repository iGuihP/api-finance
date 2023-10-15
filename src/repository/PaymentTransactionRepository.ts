import PaymentTransaction from "../models/PaymentTransaction";
import { PaymentTransactionRepositoryInterface } from "./interfaces/PaymentTransactionRepositoryInterface";
import { Op } from "sequelize";

class PaymentTransactionRepository implements PaymentTransactionRepositoryInterface {

    /**
     * Creates a new finance record.
     *
     * @param {number} userId - The ID of the user.
     * @param {number} value - The value of the finance record.
     * @param {string} description - The description of the finance record.
     * @param {number} type - The type of the finance record.
     * @param {boolean} recurrence - Indicates whether the finance record is recurring or not.
     * @return {Promise<PaymentTransaction>} A promise that resolves with the created finance record.
     */
    async create(
        userId: number,
        value: number,
        description: string,
        type: number,
    ): Promise<PaymentTransaction>
    {
        return await PaymentTransaction.create({
            userId,
            value,
            description,
            type,
        });
    }

    /**
     * Retrieves a list of finances for a given user and date.
     *
     * @param {number} userId - The ID of the user.
     * @param {Date} date - The date to filter the finances.
     * @return {Promise<{ rows: PaymentTransaction[]; count: number; }>} - A promise that resolves to an object containing the list of finances and the count of finances.
     */
    async listByMonth(userId: number, date: Date): Promise<{ rows: PaymentTransaction[]; count: number; }> {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
   
        const { rows, count } = await PaymentTransaction.findAndCountAll({
            where: {
                userId,
                // financeStart: { [Op.gte]: startOfMonth },
                // financeEnd: { [Op.lte]: endOfMonth },
                createdAt: {
                    [Op.gte]: startOfMonth,
                    [Op.lte]: endOfMonth
                }
            },
        });
    
        return { rows, count };
    }

    /**
     * Deletes a finance record from the database.
     *
     * @param {number} financeId - The ID of the finance record to be deleted.
     * @return {Promise<void>} A promise that resolves when the finance record is deleted.
     */
    async delete(financeId: number): Promise<void> {
        await PaymentTransaction.destroy({
            where: { id: financeId }
        });
    }
    
}

export { PaymentTransactionRepository }