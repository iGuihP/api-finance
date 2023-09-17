import Finance from "../models/Finance";
import { FinanceRepositoryInterface } from "./interfaces/FinanceRepositoryInterface";
import { Op } from "sequelize";

class FinanceRepository implements FinanceRepositoryInterface {

    /**
     * Creates a new finance record.
     *
     * @param {number} userId - The ID of the user.
     * @param {number} value - The value of the finance record.
     * @param {string} description - The description of the finance record.
     * @param {number} type - The type of the finance record.
     * @param {boolean} recurrence - Indicates whether the finance record is recurring or not.
     * @return {Promise<Finance>} A promise that resolves with the created finance record.
     */
    async createFinance(
        userId: number,
        value: number,
        description: string,
        type: number,
        recurrence: boolean
    ): Promise<Finance>
    {
        return await Finance.create({
            userId,
            value,
            description,
            type,
            recurrence
        });
    }

    /**
     * Retrieves a list of finances for a given user and date.
     *
     * @param {number} userId - The ID of the user.
     * @param {Date} date - The date to filter the finances.
     * @return {Promise<{ rows: Finance[]; count: number; }>} - A promise that resolves to an object containing the list of finances and the count of finances.
     */
    async listFinancesByMonth(userId: number, date: Date): Promise<{ rows: Finance[]; count: number; }> {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
   
        const { rows, count } = await Finance.findAndCountAll({
            where: {
                userId,
                financeStart: { [Op.gte]: startOfMonth },
                financeEnd: { [Op.lte]: endOfMonth },
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
    async deleteFinance(financeId: number): Promise<void> {
        await Finance.destroy({
            where: { id: financeId }
        });
    }
    
}

export { FinanceRepository }