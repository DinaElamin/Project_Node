
import express from "express";
import { register, login, getProfile, updateProfile} from "./UserController.js";
import { checkEmail } from "../../Middleware/CheckEmail.js";
import{checkAuth}from"../../Middleware/checkAuth.js"

const router = express.Router();

router.post("/register", checkEmail, register);
router.post("/login", login);
router.get("/profile", checkAuth, getProfile);
router.put("/profile", checkAuth, updateProfile);

export default router;

