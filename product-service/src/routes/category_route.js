//#region import statements
import express from "express";
import categoryController from "../controllers/category_controller.js";
import { is_authenticated } from "../middlewares/auth_middleware.js";
//#endregion

const categoryRouter = express.Router();

categoryRouter.post("/", is_authenticated, categoryController.createCategory);
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get(
  "/subcategories/:parent",
  is_authenticated,
  categoryController.getSubcategoriesController
);
categoryRouter.get(
  "/:id",
  is_authenticated,
  categoryController.getCategoryById
);
categoryRouter.put("/:id", is_authenticated, categoryController.updateCategory);
categoryRouter.delete(
  "/:id",
  is_authenticated,
  categoryController.deleteCategory
);

export default categoryRouter;
