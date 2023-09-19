import { Router } from "express";
import { ListFinancesService } from "../services/FinanceService/ListFinancesService";
import { FinanceRepository } from "../repository/FinanceRepository";
import { CreateFinanceService } from "../services/FinanceService/CreateFinanceService";
import { DeleteFinanceService } from "../services/FinanceService/DeleteFinanceService";
import { GetMonthlyFinanceDetailsService } from "../services/FinanceService/GetMonthlyFinanceDetailsService";

const financeRoutes = Router();

financeRoutes.post("/", async (req, res) => {
    const userId = req.user.id;
    const financeRepository = new FinanceRepository();

    await new CreateFinanceService(
        financeRepository
    ).create({
        userId,
        value: req.body.value,
        description: req.body.description,
        type: req.body.type,
        recurrence: req.body.recurrence,
        financeStart: req.body.financeStart,
        financeEnd: req.body.financeEnd
    });

    return res.status(201).end();
});

financeRoutes.get("/:date", async (req, res) => {
    const userId = req.user.id;
    const financeRepository = new FinanceRepository();

    const listFinances = await new ListFinancesService(
        financeRepository
    ).list({
        userId,
        date: req.params.date
    });
    return res.json(listFinances);
});

financeRoutes.get("/balance/:date", async (req, res) => {
    const userId = req.user.id;
    const financeRepository = new FinanceRepository();

    const listFinances = await new GetMonthlyFinanceDetailsService(
        financeRepository
    ).details({
        userId,
        date: req.params.date
    });
    return res.json(listFinances);
});

financeRoutes.delete("/:id", (req, res) => {
    const financeRepository = new FinanceRepository();

    new DeleteFinanceService(
        financeRepository
    ).delete({
        id: Number(req.params.id)
    });

    return res.status(200).end();
});

export default financeRoutes;