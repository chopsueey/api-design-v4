import { validationResult } from "express-validator";
import prisma from "../db";

// get all products of a user
export const getProducts = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        Product: true,
      },
    });
    res.json({ data: user.Product });
  } catch(err) {
    next(err)
  }

};

// get on product
export const getProductById = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id: id,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: product });
};

// create product
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });
  
    res.json({ data: product });
  } catch(err) {
    next(err);
  }
  
};

// update product
export const updateProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ message: errors });
    return;
  }

  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updated });
};

// delete product
export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: deleted });
};
