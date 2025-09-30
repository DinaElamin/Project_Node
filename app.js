import express from "express";
import { db } from "./Database/dbConnections.js";

const app = express();
app.use(express.json());


app.listen(5000, () => console.log("Server running on port 5000"));
