import AppError from "../../errors/AppError";
import logger from "../../utils/logger";
import dayjs from "dayjs"
import Validator from 'fastest-validator';
import { AccountPayableRepositoryInterface } from "../../repository/interfaces/AccountPayableRepositoryInterface";
import AccountPayable from "../../models/AccountPayable";

interface Request {
    userId: number;
    date: string;
}

interface Response {
    count: number;
    accountPayables: AccountPayable[];
}

class ListAccountReceivableService {
    private accountPayableRepository: AccountPayableRepositoryInterface;

    constructor(accountPayableRepository: AccountPayableRepositoryInterface) {
        this.accountPayableRepository = accountPayableRepository;
    }

    public async list(request: Request): Promise<Response> {
        try {
            logger.debug(`Listing a receivable account on the user ID: ${request.userId}`);

            this.validateRequestParameters(request);
            const {rows: accountPayables, count} = await this.accountPayableRepository.listByMonth(
                request.userId,
                dayjs(request.date).toDate()
            );

            return {
                count,
                accountPayables
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

export { ListAccountReceivableService };