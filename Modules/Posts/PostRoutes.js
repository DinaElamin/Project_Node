    import express from 'express';
    import * as PostController from './PostController.js';
    import verifyToken from '../../Middleware/VerifyToken.js';

    const router = express.Router();

    router.post('/', verifyToken, PostController.createPost);
    router.get('/', PostController.getAllPosts);
    router.get('/:id', PostController.getPostById);
    router.put('/:id', verifyToken, PostController.updatePost);
    router.delete('/:id', verifyToken, PostController.deletePost);

    export default router;
