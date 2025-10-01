import { db } from "../dbConnections.js";

const commentsCollection = db.collection("comments");

export default commentsCollection;
