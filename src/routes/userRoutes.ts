import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
    res.status(504).json({
        message: "Not Implemented"
    })
})

export default userRoutes;