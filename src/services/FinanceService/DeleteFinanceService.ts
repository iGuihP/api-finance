import { FinanceRepository } from "../../repository/FinanceRepository";
import logger from "../../utils/logger";

interface Request {
    id: number;
}

class DeleteFinanceService {
    private financeRepository: FinanceRepository;

    constructor(financeRepository: FinanceRepository) {
        this.financeRepository = financeRepository;
    }

    public async delete(request: Request): Promise<void> {
        try {
            logger.info(`Deletando a finança ID: ${request.id}`);
            await this.financeRepository.deleteFinance(
                request.id
            );
        } catch (error) {
            throw error;
        }
    }
}

export { DeleteFinanceService };