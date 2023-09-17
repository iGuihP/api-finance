import AppError from "../../errors/AppError";
import Finance from "../../models/Finance";
import { FinanceRepository } from "../../repository/FinanceRepository";
import logger from "../../utils/logger";
import dayjs from "dayjs"
import Validator from 'fastest-validator';

interface Request {
    userId: number;
    date: string;
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

    /**
     * List the user's finances based on the provided request.
     *
     * @param {Request} request - The request object containing the necessary parameters.
     * @return {Promise<Response>} - A Promise that resolves to the response object containing the list of finances and the count.
     */
    public async list(request: Request): Promise<Response> {
        try {
            logger.debug(`Listing the user's finances: ${request.userId}`);

            this.validateRequestParameters(request);
            const {rows: finances, count} = await this.financeRepository.listFinancesByMonth(request.userId, dayjs(request.date).toDate());

            return {
                count,
                finances
            }
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
            date: 'string|empty:false',
        });
    
        const result = validate(request);
    
        if (Array.isArray(result)) {
            const messageError = result[0].message || 'Error validating parameters.';
            throw new AppError(messageError, 400);
        }
    }
}

export { ListFinancesService };