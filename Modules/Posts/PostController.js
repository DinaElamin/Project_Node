import postsCollection from "../../Database/Models/PostModel.js";

// ✅ Create Post
export const createPost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const userId = req.user.id; // جاي من الـ JWT middleware

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newPost = {
      title,
      content,
      imageUrl: imageUrl || null,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const postRef = await postsCollection.add(newPost);
    res.status(201).json({ message: "Post created", postId: postRef.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Posts (based on role)
export const getPosts = async (req, res) => {
  try {
    let snapshot;

    if (req.user.role === "admin") {
      // 👨‍💼 Admin: fetch all posts
      snapshot = await postsCollection.get();
    } else {
      // 🧑‍💼 Regular user: fetch only own posts
      snapshot = await postsCollection.where("userId", "==", req.user.id).get();
    }

    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Update Post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, imageUrl } = req.body;

    const postDoc = await postsCollection.doc(id).get();
    if (!postDoc.exists) return res.status(404).json({ message: "Post not found" });

    const postData = postDoc.data();

    // 👇 اليوزر يقدر يعدل بس بوستاته، الأدمن يقدر يعدل أي حاجة
    if (req.user.role !== "admin" && postData.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await postsCollection.doc(id).update({
      ...(title && { title }),
      ...(content && { content }),
      ...(imageUrl && { imageUrl }),
      updatedAt: new Date()
    });

    res.json({ message: "Post updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const postDoc = await postsCollection.doc(id).get();
    if (!postDoc.exists) return res.status(404).json({ message: "Post not found" });

    const postData = postDoc.data();

    if (req.user.role !== "admin" && postData.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await postsCollection.doc(id).delete();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
