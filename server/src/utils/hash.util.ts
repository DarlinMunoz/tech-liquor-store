import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const passwordHashed = await bcrypt.hash(password, 10);
    return passwordHashed;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error hashing password: ${error.message}`);
    } else {
      throw new Error("Unknown error ocurred");
    }
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error verifying password: ${error.message}`);
    } else {
      throw new Error("Unknown error ocurred");
    }
  }
};
