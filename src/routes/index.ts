import { Router } from "express";
import userRoutes from "./userRoutes";
import paymentTransactionsRoute from "./paymentTransactionsRoute";
import authRoutes from "./authRoutes";

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/payment-transaction', paymentTransactionsRoute);

export default routes;