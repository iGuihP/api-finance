import AppError from "../../errors/AppError";
import PaymentTransaction from "../../models/PaymentTransaction";
import logger from "../../utils/logger";
import dayjs from "dayjs"
import Validator from 'fastest-validator';
import { PaymentTransactionRepositoryInterface } from "../../repository/interfaces/PaymentTransactionRepositoryInterface";

interface Request {
    userId: number;
    date: string;
}

interface Response {
    entrances: number;
    exits: number;
    balance: number;
}

class GetMonthlyPaymentTransactionsDetailsService {
    private paymentTransactionRepository: PaymentTransactionRepositoryInterface;

    constructor(paymentTransactionRepository: PaymentTransactionRepositoryInterface) {
        this.paymentTransactionRepository = paymentTransactionRepository;
    }

    /**
     * List the user's finances based on the provided request.
     *
     * @param {Request} request - The request object containing the necessary parameters.
     * @return {Promise<Response>} - A Promise that resolves to the response object containing the list of finances and the count.
     */
    public async details(request: Request): Promise<Response> {
        try {
            logger.debug(`Listing the user's details finance: ${request.userId}`);

            this.validateRequestParameters(request);
            const {rows: finances} = await this.paymentTransactionRepository.listByMonth(request.userId, dayjs(request.date).toDate());
            const entrances = this.sumEntrances(finances);
            const exits = this.sumExits(finances);
            const balance = this.calculateBalance(entrances, exits);

            return {
                entrances,
                exits,
                balance
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

    private sumEntrances(finances: PaymentTransaction[]): number {
        let sum = 0;
        for (const finance of finances) {
            if (finance.type === 'ENTRANCE') {
                sum += finance.value;
            }
        }
        return sum;
    }

    private sumExits(finances: PaymentTransaction[]): number {
        let sum = 0;
        for (const finance of finances) {
            if (finance.type === 'EXIT') {
                sum += finance.value;
            }
        }
        return sum;
    }

    private calculateBalance(entrances: number, exits: number): number {
        return (entrances - exits);
    }
}

export { GetMonthlyPaymentTransactionsDetailsService };