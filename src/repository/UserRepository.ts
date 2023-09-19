import { UserRepositoryInterface } from "./interfaces/UserRepositoryInterface";
import User from "../models/User";

class UserRepository implements UserRepositoryInterface {

    async createUser(
        name: string,
        email: string,
        password: string
    ): Promise<[User, boolean]>
    {
        return await User.findOrCreate({
            where: {
                email
            },
            defaults: {
                name,
                email,
                password
            }
        });
    }

    async deleteUser(id: number) {
        return await User.destroy({
            where: {
                id
            }
        });
    }

    async updateUser(id: number, name: string, email: string) {
        return await User.update({
            name,
            email
        }, {
            where: {
                id
            }
        });
    }

    async findByEmail(email: string) {
        return await User.findOne({
            where: {
                email
            }
        });
    }
    
}

export { UserRepository }