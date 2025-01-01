//#region import statements
import express from "express";
import { product_controller } from "../controllers/product_controller.js";
import { is_authenticated } from "../middlewares/auth_middleware.js";
import product_validation from "../validations/product_validation.js";
//#endregion
const product_router = express.Router();

product_router.get("/", product_controller.get_all_products);

product_router.get("/search", product_controller.search_products_controller);

product_router.get("/:id", product_controller.get_product_by_id);

product_router.get(
  "/categories/:categories",
  product_controller.get_products_by_categories
);

product_router.post(
  "/",
  is_authenticated,
  product_validation.product_validator,
  product_controller.create_product
);

product_router.put(
  "/:id",
  is_authenticated,
  product_validation.update_product_request_validator,
  product_controller.update_product
);

product_router.delete(
  "/:id",
  is_authenticated,
  product_validation.validate_product_id,
  product_controller.delete_product
);

export default product_router;
