import { Router } from "express";
import { UserRepository } from "../../repository/UserRepository";
import { CreateUserService } from "../../services/userService/CreateUserService";

const userRoutes = Router();

userRoutes.post("/", async (req, res) => {
    const userRepository = new UserRepository();

    await new CreateUserService(
        userRepository
    ).create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    return res.status(201).end();
});

export default userRoutes;