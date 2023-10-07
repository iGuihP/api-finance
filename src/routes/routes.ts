import { Router } from "express";
import userRoutes from "./routes/userRoutes";
import paymentTransactionsRoute from "./routes/paymentTransactionsRoute";
import authRoutes from "./routes/authRoutes";
import accountPayableRoute from "./routes/accountPayableRoute";
import accountReceivableRoute from "./routes/accountReceivableRoute";

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/payment-transaction', paymentTransactionsRoute);
routes.use('/payable-account', accountPayableRoute);
routes.use('/receivable-account', accountReceivableRoute);

export default routes;