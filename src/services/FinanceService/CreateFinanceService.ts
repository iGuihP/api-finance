import { FinanceRepository } from "../../repository/FinanceRepository";
import logger from "../../utils/logger";

interface Request {
    userId: number;
    value: number;
    description: string;
    type: string;
}

class CreateFinanceService {
    private financeRepository: FinanceRepository;

    constructor(financeRepository: FinanceRepository) {
        this.financeRepository = financeRepository;
    }

    public async create(request: Request): Promise<void> {
        try {
            logger.info(`Criando uma finança para o usuário ${request.userId}`);
            await this.financeRepository.createFinance(
                request.userId,
                request.value,
                request.description,
                request.type
            );
        } catch (error) {
            throw error;
        }
    }
}

export { CreateFinanceService };