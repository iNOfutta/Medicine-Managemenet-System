/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

import User from "../../../Models/user";
import connectMongo from "../../../utils/connectMongo";

export default async function add(req, res) {
  try {
    // Conectar ao banco de dados
    await connectMongo();

    // Obter dados do corpo da requisição
    const { uid, _id, quantity, name, type, uploadOn, price, date } = req.body;

    const currentAmount = quantity * price;

    // Atualizar o usuário
    const user = await User.findOneAndUpdate(
      { _id: uid },
      {
        $pull: {
          stock: { _id },
        },
        $inc: {
          totalSale: currentAmount,
        },
        $push: {
          history: {
            $each: [
              {
                name,
                quantity,
                total_quantity: 0,
                updateon: uploadOn,
                type: "sale",
              },
            ],
            $position: 0,
          },
          sales: {
            $each: [
              {
                name,
                quantity,
                remaining_quantity: 0,
                sales_amount: currentAmount,
                date,
              },
            ],
            $position: 0,
          },
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    // Enviar resposta de sucesso
    res.status(200).json({ msg: "Medicamento removido com sucesso..." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
}
