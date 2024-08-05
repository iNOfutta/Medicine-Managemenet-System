/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

import User from "../../../Models/user";
import connectMongo from "../../../utils/connectMongo";

export default async function add(req, res) {
  try {
    // Connect to the database
    await connectMongo();

    // Fetch data from request body
    const { uid, _id, quantity, remove_quantity, name, type, uploadOn } =
      req.body;

    // Find the appropriate user for the addition
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update the stock quantity
    const stockItem = user.stock.find((s) => s._id.toString() === _id);

    if (!stockItem) {
      return res.status(404).json({ msg: "Stock item not found" });
    }

    stockItem.quantity = quantity - remove_quantity;

    // Save the updated user
    await user.save();

    // Update the history
    await User.findByIdAndUpdate(
      uid,
      {
        $push: {
          history: {
            $each: [
              {
                name,
                quantity: remove_quantity,
                total_quantity: quantity - remove_quantity,
                updateon: uploadOn,
                type: "remove",
              },
            ],
            $position: 0,
          },
        },
      },
      { new: true }
    );

    // Send a success response
    res.status(200).json({ msg: "Medicamento removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}
