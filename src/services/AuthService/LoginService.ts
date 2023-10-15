import AppError from "../../errors/AppError";
import { UserRepository } from "../../repository/UserRepository";
import logger from "../../utils/logger";
import Validator from 'fastest-validator';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken'
import redis from "../../configs/redis";
import User from "../../models/User";

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

    /**
     * Logs in to a user.
     *
     * @param {Request} request - the request object containing the user's email and password
     * @return {Promise<Response>} - a promise that resolves to the response object containing the authentication token and user details
     */
    public async login(request: Request): Promise<Response> {
        try {
            logger.info(`Logging in user: ${request.email}`);

            this.validateRequestParameters(request);
            const userFound = await this.findUserByEmail(request.email);
            await this.checkPassword(request.password, userFound.password);
            const token = this.generateAuthToken(userFound.email, userFound.name, userFound.id);
            await this.saveTokenInRedis(token, userFound.id);
            
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

    /**
     * Finds a user by email.
     *
     * @param {string} email - The email of the user to find.
     * @return {Promise<User>} The user object if found.
     */
    private async findUserByEmail(email: string): Promise<User> {
        const userFound = await this.userRepository.findByEmail(email);
        if(!userFound) {
            throw new AppError('User not found', 404);
        }

        return userFound;
    }

    /**
     * Check if the provided password matches the user's password.
     *
     * @param {string} sentPassword - The password to be checked.
     * @param {string} userPassword - The user's password to compare against.
     * @return {Promise<void>} - Resolves if the password is valid, otherwise throws an AppError.
     */
    private async checkPassword(sentPassword: string, userPassword: string): Promise<void> {
        const isValidPassword = await bcrypt.compare(sentPassword, userPassword);
        if(!isValidPassword) {
            throw new AppError('Invalid password', 401);
        }
    }

    /**
     * Generates an authentication token for a user.
     *
     * @param {string} userEmail - The email of the user.
     * @param {string} userName - The name of the user.
     * @param {number} userId - The ID of the user.
     * @return {string} - The generated authentication token.
     */
    private generateAuthToken(userEmail: string, userName: string, userId: number): string {
        const secret = process.env.JWT_SECRET;
        const expiresIn = this.getExpiresIn();

        if(!secret) {
            throw new AppError('JWT_SECRET not found', 500);
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

    /**
     * Saves the given token in Redis for the specified user ID.
     *
     * @param {string} token - The token to be saved.
     * @param {number} userId - The ID of the user.
     * @return {Promise<void>} - A promise that resolves when the token is saved.
     */
    private async saveTokenInRedis(token: string, userId: number): Promise<void> {
        const expiresIn = this.getExpiresIn();
        await redis.setEx(`session:${userId}`, expiresIn, token);
    }

    /**
     * Returns the expiration time in milliseconds for the session.
     *
     * @return {number} The expiration time in milliseconds.
     */
    private getExpiresIn(): number {
        return (10 * 60 * 60 * 1000) // 1 day
    }
}

export { LoginService }