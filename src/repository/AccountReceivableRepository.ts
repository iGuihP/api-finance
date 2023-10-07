import AccountReceivable from "../models/AccountReceivable";
import PaymentTransaction from "../models/PaymentTransaction";
import { AccountReceivableRepositoryInterface } from "./interfaces/AccountReceivableRepositoryInterface";

class AccountReceivableRepository implements AccountReceivableRepositoryInterface {

    async create(
        userId: number,
        value: number,
        description: string,
        type: number,
    ): Promise<AccountReceivable>
    {
        return await AccountReceivable.create({
            userId,
            value,
            description,
            type,
        });
    }

    async delete(financeId: number): Promise<void> {
        await AccountReceivable.destroy({
            where: { id: financeId }
        });
    }
    
}

export { AccountReceivableRepository }