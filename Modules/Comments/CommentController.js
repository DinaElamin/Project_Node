import commentsCollection from "../../Database/Models/CommentModel.js";
import postsCollection from "../../Database/Models/PostModel.js"; 

// ✅ Create Comment
export const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    if (!postId || !content) {
      return res.status(400).json({ message: "postId and content are required" });
    }

    // check post exists
    const postDoc = await postsCollection.doc(postId).get();
    if (!postDoc.exists) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      postId,
      content,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const commentRef = await commentsCollection.add(newComment);
    res.status(201).json({ message: "Comment created", commentId: commentRef.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Comments for a Post
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const snapshot = await commentsCollection.where("postId", "==", postId).get();
    if (snapshot.empty) {
      return res.json([]);
    }

    const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Comment
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const commentDoc = await commentsCollection.doc(id).get();
    if (!commentDoc.exists) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const commentData = commentDoc.data();

    // user can edit own comments only, admin can edit all
    if (req.user.role !== "admin" && commentData.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await commentsCollection.doc(id).update({
      ...(content && { content }),
      updatedAt: new Date()
    });

    res.json({ message: "Comment updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const commentDoc = await commentsCollection.doc(id).get();
    if (!commentDoc.exists) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const commentData = commentDoc.data();

    if (req.user.role !== "admin" && commentData.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await commentsCollection.doc(id).delete();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
