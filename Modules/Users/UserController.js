
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usersCollection from "../../Database/Models/UserModel.js";

const JWT_SECRET = "supersecretkey"; 

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 3. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. create user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: "user",           
     
    };

    const userRef = await usersCollection.add(newUser);

    res.status(201).json({
      message: "User registered successfully",
      userId: userRef.id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. find user
    const snapshot = await usersCollection.where("email", "==", email).get();
    if (snapshot.empty) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // 2. compare password
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. create token
    const token = jwt.sign(
      { id: userDoc.id, role: userData.role },
      JWT_SECRET,
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get Profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 

    const userDoc = await usersCollection.doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    res.json({
      id: userId,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      profilePic: userData.profilePic || null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, profilePic } = req.body;

    await usersCollection.doc(userId).update({
      ...(name && { name }),
      ...(email && { email }),
      ...(profilePic && { profilePic }),
    });

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 

