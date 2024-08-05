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
    const { uid, _id, quantity, name, type, uploadOn } = req.body;

    // Remover item de estoque do usuário
    const user = await User.findOneAndUpdate(
      { _id: uid },
      {
        $pull: {
          stock: { _id },
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    // Atualizar histórico do usuário
    const current_data = {
      name,
      quantity: quantity,
      total_quantity: 0,
      updateon: uploadOn,
      type: "remove",
    };

    const new_history = [current_data, ...user.history];

    await User.findByIdAndUpdate(
      uid,
      {
        $set: {
          history: new_history,
        },
      },
      { new: true, upsert: true }
    );

    // Enviar resposta de sucesso
    res.status(200).json({ msg: "Medicamento removido com sucesso..." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
}
