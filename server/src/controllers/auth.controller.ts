import { NODE_ENV } from "@/config/env";
import { userLogin, userProfile, userRegister } from "@/services/auth.service";
import { Request, Response } from "express";

export const authRegister = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newUser = await userRegister(req.body);

    const { id, name, email, role } = newUser;

    res.status(201).json({
      message: "User registered succesfully",
      user: { id, name, email, role },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      throw new Error("Unknown error ocurred");
    }
  }
};

export const authLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const { token, user } = await userLogin(email, password);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login succesfully",
      user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      throw new Error("Unknown error ocurred");
    }
  }
};

export const authLogout = (req: Request, res: Response): void => {
  try {
    res.cookie("authToken", "", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
    });
    res.status(200).json({
      message: "Logout succesfull",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      throw new Error("Unknown error ocurred");
    }
  }
};

export const authProfile = async (
  req: Request & { user?: { id: string } },
  res: Response,
): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userProfile(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error retrieving profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
