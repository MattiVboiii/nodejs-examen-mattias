import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV || "development";

if (!MONGO_URI || !JWT_SECRET) {
  throw new Error("Missing environment variables");
}
