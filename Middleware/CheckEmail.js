
import usersCollection from "../Database/Models/UserModel.js";

export const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const snapshot = await usersCollection.where("email", "==", email).get();
    if (!snapshot.empty) {
      return res.status(400).json({ message: "Email already registered" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
