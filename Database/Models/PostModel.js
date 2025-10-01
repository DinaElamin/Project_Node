import { db } from "../dbConnections.js";

const postsCollection = db.collection("Posts");
export default postsCollection;
