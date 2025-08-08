import { Request, Response, NextFunction } from "express";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  res.send("Obteniendo productos");
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  res.send("Producto guardado");
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  res.send("Producto actualizado");
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  res.send("Producto eliminado");
};
