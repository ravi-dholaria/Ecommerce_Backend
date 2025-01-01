//#region import statements
import { check, param } from "express-validator";
import { find_product_by_id } from "../services/product_service.js";
import CustomError from "../utils/custom_error.js";
//#endregion

//#region product validator
const product_validator = [
  //#region sku validation
  check("sku")
    .trim()
    .notEmpty()
    .withMessage("Product SKU is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("SKU must be 3-20 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("SKU can only contain letters, numbers, and underscores"),
  //#endregion

  //#region title validation
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Title must be 3-20 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Title can only contain letters, numbers, and underscores"),
  //#endregion

  //#region description validation
  check("description")
    .optional()
    .trim()
    .isLength({ min: 3, max: 1000 })
    .withMessage("Description must be 3-1000 characters"),
  //#endregion

  //#region manufacture_details validation
  check("manufacture_details.manufacture_name")
    .trim()
    .notEmpty()
    .withMessage("Manufacturer name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Manufacturer name must be 3-20 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Name can only contain letters, numbers, and underscores"),

  check("manufacture_details.model_number")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Model number must be 3-20 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Model number can only contain letters, numbers, and underscores"
    ),

  check("manufacture_details.release_date")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),
  //#endregion

  //#region shipping_details validations
  check("shipping_details.weight")
    .optional()
    .isNumeric()
    .withMessage("Weight must be a number")
    .isInt({ min: 0 })
    .withMessage("Weight must be a non-negative integer"),
  check("shipping_details.height")
    .optional()
    .isNumeric()
    .withMessage("Height must be a number")
    .isInt({ min: 0 })
    .withMessage("Height must be a non-negative integer"),
  check("shipping_details.width")
    .optional()
    .isNumeric()
    .withMessage("Width must be a number")
    .isInt({ min: 0 })
    .withMessage("Width must be a non-negative integer"),
  check("shipping_details.depth")
    .optional()
    .isNumeric()
    .withMessage("Depth must be a number")
    .isInt({ min: 0 })
    .withMessage("Depth must be a non-negative integer"),
  //#endregion

  //#region quantity validation
  check("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
  //#endregion

  //#region price validation
  check("pricing.price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a positive number"),
  //#endregion

  //#region categories validation
  check("categories")
    .isArray({ min: 1, max: 5 })
    .withMessage("Must include between 1 and 5 categories")
    .custom((categories) =>
      categories.every(
        (cat) => typeof cat === "string" && cat.trim().length >= 3
      )
    )
    .withMessage("Each category must be a string of at least 3 characters"),
  //#endregion
];
//#endregion

//#region Product ID Validation
const validate_product_id = param("id")
  .trim()
  .notEmpty()
  .withMessage("Product ID is required")
  .isMongoId()
  .withMessage("Invalid product ID")
  .custom(async (id, { req }) => {
    const product = await find_product_by_id(id);
    if (!product) {
      throw new CustomError(
        `Product ID (${id}) does not belong to any product`,
        404
      );
    }
    req.product = product; // Attach the product to the request for further usage
    return true;
  });
//#endregion Product ID Validation

//#region Update Request Product Validator

// Optionalized validators for update request
const update_product_request_validator = product_validator.map((validation) =>
  validation.optional()
);

// Insert Product ID validation at the start of the validator array
update_product_request_validator.unshift(validate_product_id);

//#endregion Update Request Product Validator

export default {
  product_validator,
  update_product_request_validator,
  validate_product_id,
};
