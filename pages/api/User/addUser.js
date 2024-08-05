/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

import User from "../../../Models/user";
import connectMongo from "../../../utils/connectMongo";

export default async function add(req, res) {
  try {
    // try to connect database
    await connectMongo();
    console.log("in");
    // fetch data
    const { displayName, email, password } = req.body;
    // create new collection

    const user = new User({
      userName: displayName,
      email,
      password,
    });

    // save collection
    return user
      .save()
      .then(() => res.send({ msg: "Usuário registado com sucesso" }));
  } catch (error) {
    // console.log(error);
    res.send({ msg: error });
  }
}
