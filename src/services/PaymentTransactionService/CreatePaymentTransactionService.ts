import AppError from "../../errors/AppError";
import { PaymentTransactionRepository } from "../../repository/PaymentTransactionRepository";
import logger from "../../utils/logger";
import Validator from 'fastest-validator';

interface Request {
    userId: number;
    value: number;
    description: string;
    type: number;
}

class CreatePaymentTransactionService {
    private paymentTransactionRepository: PaymentTransactionRepository;

    constructor(paymentTransactionRepository: PaymentTransactionRepository) {
        this.paymentTransactionRepository = paymentTransactionRepository;
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

            await this.paymentTransactionRepository.create(
                request.userId,
                request.value,
                request.description,
                request.type,
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
    private async validateRequestParameters(request: Request): Promise<void> {
        const validate = new Validator().compile({
            userId: 'number|empty:false',
            value: 'number|empty:false',
            description: 'string|empty:false',
            type: 'number|empty:false',
            recurrence: 'boolean|empty:false',
            financeStart: 'string|empty:false',
            financeEnd: 'string|empty:false',
        });
    
        const result = await validate(request);
    
        if (Array.isArray(result)) {
            const messageError = result[0].message || 'Error validating parameters.';
            throw new AppError(messageError, 400);
        }
    }
}

export { CreatePaymentTransactionService };