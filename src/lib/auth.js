import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;
async function getDB() {
  if (!db) {
    await client.connect();
    db = client.db("Tonmoy_Peiver_code");
  }
  return db;
}

const dbInstance = await getDB();

export const auth = betterAuth({
  database: mongodbAdapter(dbInstance, {
    client,
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
 user: {
  additionalFields: {
    role: {
      type: "string",
      defaultValue: "student",
      required: false,
      input: true,
    },
    batch: { type: "string", required: false, input: true },
    studentRoll: { type: "string", required: false, input: true },
    academicYear: { type: "string", required: false, input: true },
    collegeName: { type: "string", required: false, input: true },
    groupName: { type: "string", required: false, input: true },
    image: { type: "string", required: false, input: true },
    studentClass: { 
        type: "string", 
        required: false, 
        input: true 
      },
  }
}
  
});