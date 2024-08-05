import User from "../../../Models/user";
import connectMongo from "../../../utils/connectMongo";

export default async function login(req, res) {
  try {
    await connectMongo();

    const { email, password } = req.body;

    // Attempt to find a user by both email and password
    const user = await User.findOne({ email, password }).exec(); // This is NOT secure for production use

    if (!user) {
      return res
        .status(404)
        .send({ error: "Usuário não encontrado ou senha inválida" });
    }

    // Since we found the user with the exact email and password, login is successful
    return res.send({ user: user.toObject(), msg: "Conectado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
