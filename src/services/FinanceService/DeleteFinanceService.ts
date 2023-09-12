import AppError from "../../errors/AppError";
import { FinanceRepository } from "../../repository/FinanceRepository";
import logger from "../../utils/logger";
import Validator from 'fastest-validator';

interface Request {
    id: number;
}

class DeleteFinanceService {
    private financeRepository: FinanceRepository;

    constructor(financeRepository: FinanceRepository) {
        this.financeRepository = financeRepository;
    }

    /**
     * Deletes a finance record based on the provided request.
     *
     * @param {Request} request - The request object containing the ID of the finance record to be deleted.
     * @return {Promise<void>} Promise that resolves when the finance record is successfully deleted.
     */
    public async delete(request: Request): Promise<void> {
        try {
            logger.info(`Deletando a finança ID: ${request.id}`);

            this.validateRequestParameters(request);

            await this.financeRepository.deleteFinance(
                request.id
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
            id: 'number|empty:false',
        });
    
        const result = validate(request);
    
        if (Array.isArray(result)) {
            const messageError = result[0].message || 'Erro na validação dos parâmetros.';
            throw new AppError(messageError, 400);
        }
    }
}

export { DeleteFinanceService };