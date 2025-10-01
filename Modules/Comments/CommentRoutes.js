import express from "express";
import { createComment, getCommentsByPost, updateComment, deleteComment } from "./CommentController.js";
import { checkAuth } from "../../Middleware/checkAuth.js";

const router = express.Router();

// Create Comment
router.post("/", checkAuth, createComment);

// Get Comments for a specific Post
router.get("/:postId", checkAuth, getCommentsByPost);

// Update Comment
router.put("/:id", checkAuth, updateComment);

// Delete Comment
router.delete("/:id", checkAuth, deleteComment);

export default router;
