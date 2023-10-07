import AccountPayable from "../../models/AccountPayable";

interface AccountPayableRepositoryInterface {
    create(userId: number, value: number, description: string, type: number): Promise<AccountPayable>;
    listByMonth(userId: number, date: Date): Promise<{ rows: AccountPayable[]; count: number; }>;
    delete(financeId: number): Promise<void>;
}

export {AccountPayableRepositoryInterface}