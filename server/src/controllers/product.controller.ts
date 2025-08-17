import { RequestHandler } from "express";
import { productRepository } from "@/services/product.service";

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await productRepository.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl, category } = req.body;

    if (!name || !description || !price || !stock || !category) {
      res.status(400).json({ message: "Faltan campos obligatorios" });
      return;
    }

    const newProduct = productRepository.create({
      name,
      description,
      price,
      stock,
      imageUrl,
      category,
    });

    await productRepository.save(newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const foundProduct = await productRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!foundProduct) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    const { name, description, price, stock, imageUrl, category } = req.body;

    if (name !== undefined) foundProduct.name = name;
    if (description !== undefined) foundProduct.description = description;
    if (price !== undefined) foundProduct.price = price;
    if (stock !== undefined) foundProduct.stock = stock;
    if (imageUrl !== undefined) foundProduct.imageUrl = imageUrl;
    if (category !== undefined) foundProduct.category = category;

    await productRepository.save(foundProduct);

    res.json({ message: "Producto actualizado", product: foundProduct });
  } catch (error) {
    console.error("Error al actualizar producto", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const foundProduct = await productRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!foundProduct) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    await productRepository.remove(foundProduct);

    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar producto", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
