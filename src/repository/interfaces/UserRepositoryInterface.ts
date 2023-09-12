import User from "../../models/User";

interface UserRepositoryInterface {
    createUser(name: string, email: string, password: string): Promise<[User, boolean]>;
}

export {UserRepositoryInterface}