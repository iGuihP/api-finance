import { Router } from "express";
import userRoutes from "./userRoutes";
import financeRoutes from "./financeRoutes";

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/finance', financeRoutes);

export default routes;