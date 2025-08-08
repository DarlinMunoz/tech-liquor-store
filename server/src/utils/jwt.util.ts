import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config/env";

interface TokenPayload {
  id: string | number;
  role: string;
}

export const generateToken = async (payload: TokenPayload): Promise<string> => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return token;
  } catch (error) {
    throw new Error("Failed to generate token");
  }
};

export const verifyToken = async (token: string): Promise<TokenPayload> => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    } else if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired");
    } else {
      throw new Error("Token verification failed");
    }
  }
};
