import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecretkey"; 

export const checkAuth = (req, res, next) => {
  const token = req.headers["authorization"]; 
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
