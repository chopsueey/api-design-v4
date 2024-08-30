import { Router } from "express";
import { body, validationResult } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getAllUpdates, getUpdateById, updateUpdate } from "./handlers/update";
// oneOf([check('status').equals('IN_PROGRESS'), check('status').equals('SHIPPED'), check('status').equals('DEPRECATED')])

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "There is nothing here, but you are authorized." });
});

/**
 * Product
 */
router.get("/product", getProducts);

router.get("/product/:id", getProductById);

router.post("/product", createProduct);

router.put("/product/:id", body("name").isString(), updateProduct);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getAllUpdates);

router.get("/update/:id", getUpdateById);

router.post("/update", createUpdate);

router.put("/update/:id", updateUpdate);

router.delete("/update/:id", deleteUpdate);

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint", (req, res) => {});

router.put("/updatepoint/:id", (req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});

export default router;
