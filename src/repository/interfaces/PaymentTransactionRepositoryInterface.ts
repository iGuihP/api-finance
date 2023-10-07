import PaymentTransaction from "../../models/PaymentTransaction";

interface PaymentTransactionRepositoryInterface {
    create(userId: number, value: number, description: string, type: number, recurrence: boolean, financeStart: string, financeEnd: string): Promise<PaymentTransaction>;
    listByMonth(userId: number, date: Date): Promise<{ rows: PaymentTransaction[]; count: number; }>;
    delete(financeId: number): Promise<void>;
}

export {PaymentTransactionRepositoryInterface}