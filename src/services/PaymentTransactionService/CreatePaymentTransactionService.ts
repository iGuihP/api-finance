import AppError from "../../errors/AppError";
import { PaymentTransactionRepositoryInterface } from "../../repository/interfaces/PaymentTransactionRepositoryInterface";
import logger from "../../utils/logger";
import Validator from 'fastest-validator';

interface Request {
    userId: number;
    value: number;
    description: string;
    type: number;
}

class CreatePaymentTransactionService {
    private paymentTransactionRepository: PaymentTransactionRepositoryInterface;

    constructor(paymentTransactionRepository: PaymentTransactionRepositoryInterface) {
        this.paymentTransactionRepository = paymentTransactionRepository;
    }

    /**
     * Creates a finance record for the user.
     *
     * @param {Request} request - The request object containing user information.
     * @return {Promise<void>} - A promise that resolves when the finance record is created.
     */
    public async create(request: Request): Promise<void> {
        logger.info(`Criando uma finança para o usuário ${request.userId}`);
        this.validateRequestParameters(request);

        await this.paymentTransactionRepository.create(
            request.userId,
            request.value,
            request.description,
            request.type,
        );
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
            type: 'string|empty:false',
        });
    
        const result = validate(request);
    
        if (Array.isArray(result)) {
            const messageError = result[0].message || 'Error validating parameters.';
            throw new AppError(messageError, 400);
        }
    }
}

export { CreatePaymentTransactionService };