import { auth } from "@/lib/auth"; // আপনার auth ফাইলের সঠিক পাথ
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);