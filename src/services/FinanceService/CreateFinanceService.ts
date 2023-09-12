import AppError from "../../errors/AppError";
import { FinanceRepository } from "../../repository/FinanceRepository";
import logger from "../../utils/logger";
import Validator from 'fastest-validator';

interface Request {
    userId: number;
    value: number;
    description: string;
    type: number;
    recurrence: boolean;
}

class CreateFinanceService {
    private financeRepository: FinanceRepository;

    constructor(financeRepository: FinanceRepository) {
        this.financeRepository = financeRepository;
    }

    /**
     * Creates a finance record for the user.
     *
     * @param {Request} request - The request object containing user information.
     * @return {Promise<void>} - A promise that resolves when the finance record is created.
     */
    public async create(request: Request): Promise<void> {
        try {
            logger.info(`Criando uma finança para o usuário ${request.userId}`);
            this.validateRequestParameters(request);

            await this.financeRepository.createFinance(
                request.userId,
                request.value,
                request.description,
                request.type,
                request.recurrence
            );
        } catch (error) {
            throw error;
        }
    }

    /**
     * Validates the request parameters.
     *
     * @param {Request} request - The request object to validate.
     * @return {void} This function does not return a value.
     */
    private validateRequestParameters(request: Request): void {
        const validate = new Validator().compile({
            userId: 'number|empty:false',
            value: 'number|empty:false',
            description: 'string|empty:false',
            type: 'number|empty:false',
            recurrence: 'boolean|empty:false',
        });
    
        const result = validate(request);
    
        if (Array.isArray(result)) {
            const messageError = result[0].message || 'Erro na validação dos parâmetros.';
            throw new AppError(messageError, 400);
        }
    }
}

export { CreateFinanceService };