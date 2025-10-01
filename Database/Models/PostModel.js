        // Database/Models/PostModel.js
        import { db } from '../dbConnections.js';  // Firebase Firestore instance

        const postsCollection = db.collection('posts');

        export const createPost = async (postData) => {
        const docRef = await postsCollection.add({
            title: postData.title,
            content: postData.content,
            imageUrl: postData.imageUrl || null,
            userId: postData.userId,
            createdAt: new Date().toISOString(),
        });
        const newPost = await docRef.get();
        return { id: docRef.id, ...newPost.data() };
        };

        export const getAllPosts = async () => {
        const snapshot = await postsCollection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        };

        export const getPostById = async (id) => {
        const doc = await postsCollection.doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
        };

        export const updatePost = async (id, updates) => {
        await postsCollection.doc(id).update(updates);
        const updatedDoc = await postsCollection.doc(id).get();
        return { id: updatedDoc.id, ...updatedDoc.data() };
        };

        export const deletePost = async (id) => {
        await postsCollection.doc(id).delete();
        };
