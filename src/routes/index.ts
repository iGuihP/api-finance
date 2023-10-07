import { Router } from "express";
import userRoutes from "./userRoutes";
import financeRoutes from "./financeRoutes";
import authRoutes from "./authRoutes";

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/finance', financeRoutes);

export default routes;