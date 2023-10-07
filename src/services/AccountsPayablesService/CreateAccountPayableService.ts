import AppError from "../../errors/AppError";
import { PaymentTransactionRepository } from "../../repository/PaymentTransactionRepository";
import { AccountPayableRepositoryInterface } from "../../repository/interfaces/AccountPayableRepositoryInterface";
import logger from "../../utils/logger";
import Validator from 'fastest-validator';

interface Request {
    userId: number;
    value: number;
    description: string;
    type: number;
}

class CreateAccountPayableService {
    private accountPayableRepository: AccountPayableRepositoryInterface;

    constructor(accountPayableRepository: AccountPayableRepositoryInterface) {
        this.accountPayableRepository = accountPayableRepository;
    }

    public async create(request: Request): Promise<void> {
        try {
            logger.info(`Creating a payable account in the user: ${request.userId}`);
            this.validateRequestParameters(request);

            await this.accountPayableRepository.create(
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
        });
    
        const result = await validate(request);
    
        if (Array.isArray(result)) {
            const messageError = result[0].message || 'Error validating parameters.';
            throw new AppError(messageError, 400);
        }
    }
}

export { CreateAccountPayableService };