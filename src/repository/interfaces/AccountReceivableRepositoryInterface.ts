import AccountReceivable from "../../models/AccountReceivable";
import PaymentTransaction from "../../models/PaymentTransaction";

interface AccountReceivableRepositoryInterface {
    create(userId: number, value: number, description: string, type: number): Promise<AccountReceivable>;
    listByMonth(userId: number, date: Date): Promise<{ rows: AccountReceivable[]; count: number; }>;
    delete(financeId: number): Promise<void>;
}

export {AccountReceivableRepositoryInterface}