import admin from "firebase-admin";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const serviceAccountPath = join(__dirname, "../serviceAcountKey.json");

const serviceAccount = JSON.parse(
  readFileSync(serviceAccountPath, "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "nodejsprojec-56671.appspot.com", 
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

export { db, bucket };
