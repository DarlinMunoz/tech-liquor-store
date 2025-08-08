import { AppDataSource } from "@/database/data-source";
import { User } from "@/entities/User";
import { comparePassword, hashPassword } from "@/utils/hash.util";
import { generateToken } from "@/utils/jwt.util";

export const userRegister = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = userData;
  const userRepository = AppDataSource.getRepository(User);

  try {
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("User already registered");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await userRepository.save(newUser);

    const userWithoutPassword = {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };

    return userWithoutPassword;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error registering user: ${error.message}`);
    } else {
      throw new Error("Unknown error ocurred");
    }
  }
};

export const userLogin = async (email: string, password: string) => {
  const userRepository = AppDataSource.getRepository(User);

  try {
    // Buscar al usuario por correo electrónico
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verificar la contraseña
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    // Generar el token
    const token = await generateToken({ id: user.id, role: user.role });

    // Retornar el token y datos relevantes del usuario
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error logging in: ${error.message}`);
    } else {
      throw new Error("Unknown error ocurred");
    }
  }
};

export const userProfile = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  try {
    const user = await userRepository.findOne({
      where: { id: userId },
      select: ["id", "name", "email", "role", "createdAt", "updatedAt"],
    });
    return user;
  } catch (error: unknown) {
    console.error(error);
  }
};
