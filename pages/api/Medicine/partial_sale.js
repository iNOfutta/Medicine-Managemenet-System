/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

import User from "../../../Models/user";
import connectMongo from "../../../utils/connectMongo";

export default async function add(req, res) {
  try {
    // Tentar conectar ao banco de dados
    await connectMongo();

    // Obter dados do corpo da requisição
    const {
      uid,
      _id,
      quantity,
      remove_quantity,
      name,
      type,
      uploadOn,
      date,
      price,
    } = req.body;

    console.log("Body: ", req.body);

    // Encontrar o usuário apropriado para a adição
    const salesAmount = price * remove_quantity;

    // Buscar usuário pelo ID
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    // Atualizar quantidade de estoque
    const stockItem = user.stock.find((s) => s._id.toString() === _id);

    if (!stockItem) {
      return res.status(404).json({ msg: "Item de estoque não encontrado" });
    }

    stockItem.quantity = quantity - remove_quantity;

    // Salvar o usuário atualizado
    await user.save();

    // Atualizar histórico e vendas
    await User.findByIdAndUpdate(
      uid,
      {
        $push: {
          history: {
            $each: [
              {
                name,
                quantity,
                total_quantity: quantity - remove_quantity,
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
                remaining_quantity: quantity - remove_quantity,
                sales_amount: quantity * price,
                date,
              },
            ],
            $position: 0,
          },
        },
        $set: {
          totalSale: user.totalSale + salesAmount,
        },
      },
      { new: true }
    );

    // Enviar resposta de sucesso
    res.status(200).json({ msg: "Medicamento removido com sucesso..." });
  } catch (error) {
    console.error("Error today: ", error);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
}
