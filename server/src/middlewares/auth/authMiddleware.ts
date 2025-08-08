import { Request, Response, NextFunction } from "express";
import { DecodedToken } from "@/types/decodedToken";
import { verifyToken } from "@/utils/jwt.util";

interface AuthRequest extends Request {
  user?: DecodedToken;
}

// Middleware para autenticar el token
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.cookies?.authToken;

  if (!token) {
    res.status(403).json({ error: "Token not found" });
    return;
  }

  try {
    const decoded = (await verifyToken(token)) as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware para autorizar según rol
export const authorizeRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      res.status(403).json({ message: "Permissions denied" });
      return;
    }

    next();
  };
};
