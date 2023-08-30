import Finance from "../models/Finance";
import { FinanceRepositoryInterface } from "./interfaces/FinanceRepositoryInterface";

class FinanceRepository implements FinanceRepositoryInterface {
    async createFinance(
        userId: number,
        value: number,
        description: string,
        type: string
    ): Promise<Finance>
    {
        return await Finance.create({
            userId,
            value,
            description,
            type
        });
    }
    async listFinancesByUserId(userId: number): Promise<{ rows: Finance[]; count: number; }> {
        return await Finance.findAndCountAll({
            where: { userId }
        });
    }
    async deleteFinance(financeId: number): Promise<void> {
        await Finance.destroy({
            where: { id: financeId }
        });
    }
    
}

export { FinanceRepository }