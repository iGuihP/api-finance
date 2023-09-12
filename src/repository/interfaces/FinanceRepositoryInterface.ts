import Finance from "../../models/Finance";

interface FinanceRepositoryInterface {
    createFinance(userId: number, value: number, description: string, type: number, recurrence: boolean): Promise<Finance>;
    listFinancesByMonth(userId: number, date: Date): Promise<{ rows: Finance[]; count: number; }>;
    deleteFinance(financeId: number): Promise<void>;
}

export {FinanceRepositoryInterface}