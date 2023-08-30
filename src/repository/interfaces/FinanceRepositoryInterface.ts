import Finance from "../../models/Finance";

interface FinanceRepositoryInterface {
    createFinance(userId: number, value: number, description: string, type: string): Promise<Finance>;
    listFinancesByUserId(userId: number): Promise<{ rows: Finance[]; count: number; }>;
    deleteFinance(financeId: number): Promise<void>;
}

export {FinanceRepositoryInterface}