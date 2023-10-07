import AppError from "../../errors/AppError";
import { UserRepository } from "../../repository/UserRepository";
import logger from "../../utils/logger";
import Validator from 'fastest-validator';
import bcrypt from "bcrypt"

interface Request {
    name: string;
    password:string;
    email: string;
}

class CreateUserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async create(request: Request): Promise<void> {
        try {
            logger.info(`Creating a new user with email: ${request.email}`);
            this.validateRequestParameters(request);

            const cryptedPassword = await this.cryptPassword(request.password);

            await this.userRepository.createUser(
                request.name,
                request.email,
                cryptedPassword
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
            name: 'string|empty:false',
            email: 'string|empty:false',
            password: 'string|empty:false',
        });
    
        const result = validate(request);
    
        if (Array.isArray(result)) {
            const messageError = result[0].message || 'Error validating parameters.';
            throw new AppError(messageError, 400);
        }
    }

    private async cryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}

export { CreateUserService };