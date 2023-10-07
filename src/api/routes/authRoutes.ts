import { Router } from "express";
import { UserRepository } from "../../repository/UserRepository";
import { LoginService } from "../../services/authService/LoginService";

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