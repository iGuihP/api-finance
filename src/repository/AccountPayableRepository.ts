import AccountPayable from "../models/AccountPayable";
import PaymentTransaction from "../models/PaymentTransaction";
import { AccountPayableRepositoryInterface } from "./interfaces/AccountPayableRepositoryInterface";
import { PaymentTransactionRepositoryInterface } from "./interfaces/PaymentTransactionRepositoryInterface";
import { Op } from "sequelize";

class AccountPayableRepository implements AccountPayableRepositoryInterface {

    async create(
        userId: number,
        value: number,
        description: string,
        type: number,
    ): Promise<AccountPayable>
    {
        return await AccountPayable.create({
            userId,
            value,
            description,
            type,
        });
    }

    async listByMonth(userId: number, date: Date): Promise<{ rows: AccountPayable[]; count: number; }> {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
   
        const { rows, count } = await AccountPayable.findAndCountAll({
            where: {
                userId,
                createdAt: { [Op.gte]: startOfMonth },
            },
        });
    
        return { rows, count };
    }

    async delete(financeId: number): Promise<void> {
        await AccountPayable.destroy({
            where: { id: financeId }
        });
    }
    
}

export { AccountPayableRepository }