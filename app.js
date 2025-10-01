
import express from "express";
import userRoutes from "./Modules/Users/UserRoutes.js";
import postRoutes from "./Modules/Posts/PostRoutes.js"; 
import commentRoutes from "./Modules/Comments/CommentRoutes.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);


app.listen(5000, () => 
    console.log("Server running on port 5000")
);



export default app;
