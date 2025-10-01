
import express from "express";
import userRoutes from "./Modules/Users/UserRoutes.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
