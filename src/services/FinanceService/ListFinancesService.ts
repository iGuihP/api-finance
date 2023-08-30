import Finance from "../../models/Finance";
import { FinanceRepository } from "../../repository/FinanceRepository";
import logger from "../../utils/logger";

interface Request {
    userId: number;
}

interface Response {
    count: number;
    finances: Finance[];
}

class ListFinancesService {
    private financeRepository: FinanceRepository;

    constructor(financeRepository: FinanceRepository) {
        this.financeRepository = financeRepository;
    }

    public async list(request: Request): Promise<Response> {
        try {
            logger.debug(`Listando as finanças do usuário: ${request.userId}`);

            const {rows: finances, count} = await this.financeRepository.listFinancesByUserId(request.userId);

            return {
                count,
                finances
            }
        } catch (error) {
            throw error;
        }
    }
}

export { ListFinancesService };