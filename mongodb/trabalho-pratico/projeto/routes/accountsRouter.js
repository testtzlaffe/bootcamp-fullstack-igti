import express from "express";
import { accountModel } from "../models/account.js";

const router = express.Router();

router.get("/accounts", async (request, response) => {
  try {
    const accounts = await accountModel.find({});
    return response.json({ accounts });
  } catch (error) {
    return response.status(500).json({ error: "erro ao listar as contas" });
  }
});

router.post("/accounts", async (request, response) => {
  try {
    const account = new accountModel(request.body);
    await account.save();
    return response.json(account);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

router.put("/accounts/:id", async (request, response) => {
  try {
    const account = await accountModel.findOneAndUpdate(
      { _id: request.params.id },
      request.body,
      { new: true }
    );
    if (!account) {
      return response.status(404).json({ error: "documento nao encontrado" });
    }
    return response.json(account);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

router.patch("/accounts/deposito", async (request, response) => {
  const { agencia, conta, valor } = request.body;
  try {
    const account = await accountModel.findOneAndUpdate(
      { agencia, conta },
      { $inc: { balance: valor } },
      { new: true }
    );
    if (!account) {
      return response.status(404).json({ error: "conta nao encontrada" });
    }
    return response.json({ saldoAtual: account.balance });
  } catch (error) {
    return response.status(500).json({ error });
  }
});

router.patch("/accounts/saque", async (request, response) => {
  const { agencia, conta, valor } = request.body;
  try {
    let account = await accountModel.findOne({ agencia, conta });
    if (account && account.balance >= valor + 1) {
      account = await accountModel.findOneAndUpdate(
        { agencia, conta },
        { $inc: { balance: valor * -1 - 1 } },
        { new: true }
      );
    } else if (account) {
      return response.json({ msg: "saldo insuficiente para este saque" });
    }
    if (!account) {
      return response.status(404).json({ error: "conta nao encontrada" });
    }
    return response.json({ saldoAtual: account.balance });
  } catch (error) {
    return response.status(500).json({ error });
  }
});

router.get("/accounts/saldo/:agencia/:conta", async (request, response) => {
  const { agencia, conta } = request.params;
  try {
    const account = await accountModel.findOne({ agencia, conta });
    if (!account) {
      return response.status(404).json({ error: "conta nao encontrada" });
    }
    return response.json({ saldoAtual: account.balance });
  } catch (error) {
    return response.status(500).json({ error });
  }
});

router.delete("/accounts/:agencia/:conta", async (request, response) => {
  const { agencia, conta } = request.params;
  try {
    const account = await accountModel.findOneAndDelete({ agencia, conta });
    if (!account) {
      return response.status(404).json({ error: "conta nao encontrada" });
    }
    const accountQuantity = await accountModel.countDocuments({ agencia });
    return response.json({ quantidade: accountQuantity });
  } catch (error) {
    return response.status(500).json({ error });
  }
});

router.post("/accounts/transferencia", async (request, response) => {
  const { contaOrigem, contaDestino, valor } = request.body;
  let tarifa = 0;
  try {
    const accountOrigem = await accountModel.findOne({ conta: contaOrigem });
    const accountDestino = await accountModel.findOne({ conta: contaDestino });
    console.log(accountOrigem.agencia, tarifa);
    if (accountOrigem.agencia !== accountDestino.agencia) {
      tarifa = 8;
    }

    if (accountOrigem.balance < +valor + tarifa) {
      return response.json({ msg: "saldo insuficiente para transferencia" });
    }

    const account = await accountModel.findOneAndUpdate(
      { conta: contaOrigem },
      { $inc: { balance: valor * -1 - tarifa } },
      { new: true }
    );

    await accountModel.findOneAndUpdate(
      { conta: contaDestino },
      { $inc: { balance: +valor } }
    );

    return response.json({ saldoContaOrigem: account.balance });
  } catch (error) {
    return response.status(500).json({ error });
  }
});

router.get("/accounts/media/:agencia", async (request, response) => {
  const { agencia } = request.params;
  try {
    const accounts = await accountModel.aggregate([
      {
        $group: {
          _id: "$agencia",
          media: {
            $avg: "$balance",
          },
        },
      },
    ]);
    const account = accounts.filter((account) => account._id === +agencia);
    return response.json({ media: account[0].media });
  } catch (error) {
    return response.status(500).json({ error });
  }
});

router.get("/accounts/menores/:quantidade", async (request, response) => {
  const { quantidade } = request.params;
  try {
    const accounts = await accountModel
      .find({})
      .sort({ balance: 1 })
      .limit(+quantidade);
    return response.json(accounts);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

router.get("/accounts/maiores/:quantidade", async (request, response) => {
  const { quantidade } = request.params;
  try {
    const accounts = await accountModel
      .find({})
      .sort({ balance: -1 })
      .limit(+quantidade);
    return response.json(accounts);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

export { router };
