import AppError from "../../errors/AppError";
import { FinanceRepository } from "../../repository/FinanceRepository";
import { UserRepository } from "../../repository/UserRepository";
import logger from "../../utils/logger";
import Validator from 'fastest-validator';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken'

interface Request {
    email: string;
    password: string;
}

interface Response {
    token: string;
    userDetails: {
        id: number;
        name: string;
        email: string
    };
}

class LoginService {
    constructor(
        private userRepository: UserRepository
    ) {}

    public async login(request: Request): Promise<Response> {
        try {
            logger.info(`Logging in user: ${request.email}`);

            this.validateRequestParameters(request);
            const userFound = await this.findUserByEmail(request.email);
            await this.checkPassword(request.password, userFound.password);
            const token = this.generateAuthToken(userFound.email, userFound.name, userFound.id);

            logger.info(`Logged in user: ${request.email}`);

            return {
                token,
                userDetails: {
                    id: userFound.id,
                    name: userFound.name,
                    email: userFound.email
                }
            };

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
            email: 'string|empty:false',
            password: 'string|empty:false',
        });
    
        const result = validate(request);
    
        if (Array.isArray(result)) {
            const messageError = result[0].message || 'Error validating parameters.';
            throw new AppError(messageError, 400);
        }
    }

    private async findUserByEmail(email: string) {
        const userFound = await this.userRepository.findByEmail(email);
        if(!userFound) {
            throw new AppError('User not found', 404);
        }

        return userFound;
    }

    private async checkPassword(sentPassword: string, userPassword: string): Promise<void> {
        const isValidPassword = await bcrypt.compare(sentPassword, userPassword);
        if(!isValidPassword) {
            throw new AppError('Invalid password', 401);
        }
    }

    private generateAuthToken(userEmail: string, userName: string, userId: number): string {
        const secret = process.env.SECRET;
        const expiresIn = '1d';

        if(!secret) {
            throw new AppError('Secret not found', 500);
        }

        return sign(
            {
                userEmail,
                userName,
                userId
            },
            secret,
            {
              expiresIn
            }
        );
    }
}