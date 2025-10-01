        import * as PostModel from '../../Database/Models/PostModel.js';

        export const createPost = async (req, res) => {
        try {
            const { title, content, imageUrl } = req.body;
            const userId = req.user.id;  // Middleware must be token

            const post = await PostModel.createPost({ title, content, imageUrl, userId });
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create post', error: error.message });
        }
        };

        export const getAllPosts = async (req, res) => {
        try {
            const posts = await PostModel.getAllPosts();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
        }
        };

        export const getPostById = async (req, res) => {
        try {
            const post = await PostModel.getPostById(req.params.id);
            if (!post) return res.status(404).json({ message: 'Post not found' });
            res.json(post);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch post', error: error.message });
        }
        };

        export const updatePost = async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const role = req.user.role;

            const post = await PostModel.getPostById(id);
            if (!post) return res.status(404).json({ message: 'Post not found' });

            //  Admin or post owner or user can updte it
            if (post.userId !== userId && role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
            }

            const updatedPost = await PostModel.updatePost(id, req.body);
            res.json(updatedPost);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update post', error: error.message });
        }
        };

        export const deletePost = async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const role = req.user.role;

            const post = await PostModel.getPostById(id);
            if (!post) return res.status(404).json({ message: 'Post not found' });

            //  Admin or post owner can updte it
            if (post.userId !== userId && role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
            }

            await PostModel.deletePost(id);
            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete post', error: error.message });
        }
        };
