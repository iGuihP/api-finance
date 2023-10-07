import { Router } from "express";
import { UserRepository } from "../repository/UserRepository";
import { CreateUserService } from "../services/UserService/CreateUserService";
import { LoginService } from "../services/AuthService/LoginService";

const authRoutes = Router();

authRoutes.post("/login", async (req, res) => {
    const userRepository = new UserRepository();

    const userLogged = await new LoginService(userRepository).login({
        email: req.body.email,
        password: req.body.password
    });

    return res.status(200).json(userLogged);
});

export default authRoutes;