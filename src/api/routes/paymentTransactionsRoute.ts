import { Router } from "express";
import { ListPaymentTransactionsService } from "../../services/paymentTransactionService/ListPaymentTransactionsService";
import { PaymentTransactionRepository } from "../../repository/PaymentTransactionRepository";
import { CreatePaymentTransactionService } from "../../services/paymentTransactionService/CreatePaymentTransactionService";
import { DeletePaymentTransactionService } from "../../services/paymentTransactionService/DeletePaymentTransactionService";
import { GetMonthlyPaymentTransactionsDetailsService } from "../../services/paymentTransactionService/GetMonthlyPaymentTransactionsDetailsService";

const paymentTransactionsRoute = Router();

paymentTransactionsRoute.post("/", async (req, res) => {
    const userId = req.user.id;
    const paymentTransactionRepository = new PaymentTransactionRepository();

    await new CreatePaymentTransactionService(
        paymentTransactionRepository
    ).create({
        userId,
        value: req.body.value,
        description: req.body.description,
        type: req.body.type,
    });

    return res.status(201).end();
});

paymentTransactionsRoute.get("/:date", async (req, res) => {
    const userId = req.user.id;
    const paymentTransactionRepository = new PaymentTransactionRepository();

    const paymentsTransactions = await new ListPaymentTransactionsService(
        paymentTransactionRepository
    ).list({
        userId,
        date: req.params.date
    });
    return res.json(paymentsTransactions);
});

paymentTransactionsRoute.get("/balance/:date", async (req, res) => {
    const userId = req.user.id;
    const paymentTransactionRepository = new PaymentTransactionRepository();

    const monthlyTransactions = await new GetMonthlyPaymentTransactionsDetailsService(
        paymentTransactionRepository
    ).details({
        userId,
        date: req.params.date
    });
    return res.json(monthlyTransactions);
});

paymentTransactionsRoute.delete("/:id", (req, res) => {
    const paymentTransactionRepository = new PaymentTransactionRepository();

    new DeletePaymentTransactionService(
        paymentTransactionRepository
    ).delete({
        id: Number(req.params.id)
    });

    return res.status(200).end();
});

export default paymentTransactionsRoute;