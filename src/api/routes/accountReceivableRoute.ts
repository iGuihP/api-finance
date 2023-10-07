import { Router } from "express";
import { AccountPayableRepository } from "../../repository/AccountPayableRepository";
import { CreateAccountPayableService } from "../../services/accountsPayableService/CreateAccountPayableService";
import { ListAccountPayableService } from "../../services/accountsPayableService/ListAccountPayableService";
import { DeleteAccountPayableService } from "../../services/accountsPayableService/DeleteAccountPayableService";

const accountReceivableRoute = Router();

accountReceivableRoute.post("/", async (req, res) => {
    const userId = req.user.id;
    const accountPayableRepository = new AccountPayableRepository();

    await new CreateAccountPayableService(
        accountPayableRepository
    ).create({
        userId,
        value: req.body.value,
        description: req.body.description,
        type: req.body.type,
    });

    return res.status(201).end();
});

accountReceivableRoute.get("/:date", async (req, res) => {
    const userId = req.user.id;
    const accountPayableRepository = new AccountPayableRepository();

    const payableAccounts = await new ListAccountPayableService(
        accountPayableRepository
    ).list({
        userId,
        date: req.params.date
    });
    return res.json(payableAccounts);
});

accountReceivableRoute.delete("/:id", (req, res) => {
    const accountPayableRepository = new AccountPayableRepository();

    new DeleteAccountPayableService(
        accountPayableRepository
    ).delete({
        id: Number(req.params.id)
    });

    return res.status(200).end();
});

export default accountReceivableRoute;