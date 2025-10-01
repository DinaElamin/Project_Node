
   
    import express from "express";
    import { createPost, getPosts, updatePost, deletePost } from "./PostController.js";
    import { checkAuth } from "../../Middleware/checkAuth.js"; // middleware JWT
    
    const router = express.Router();


    // Create Post (user + admin)
    router.post("/", checkAuth, createPost);

    // Get All Posts (anyone can view)
    router.get("/",checkAuth, getPosts);

    // Update Post (owner or admin)
    router.put("/:id", checkAuth, updatePost);

    // Delete Post (owner or admin)
    router.delete("/:id", checkAuth, deletePost);

    export default router;

