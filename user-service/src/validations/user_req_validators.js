//#region Import statements
import exp from "constants";
import { check } from "express-validator";
//#endregion

const other_validators = [
  // Username: no special characters, 3-20 characters long
  check("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),

  // Phone number: must be 10 digits
  check("phone_number")
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be exactly 10 digits")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must contain only numbers"),

  // Password: strong password validation (minimum 8 characters, at least one letter, one number)
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  // Address: ensure non-empty
  check("address").notEmpty().withMessage("Address is required"),
];

//#region user Register Request Validator
export const user_register_validator = [
  // Email: validation using regex
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) // Deep email regex validation
    .withMessage("Email format is incorrect"),

  // Role: Must be one of ['buyer', 'seller', 'admin']
  check("role")
    .optional() // Optional because the default in the schema is 'buyer'
    .isIn(["buyer", "seller", "admin"])
    .withMessage("Invalid role; must be one of 'buyer', 'seller', or 'admin'"),
  ...other_validators,
];
//#endregion

//#region user login request validator
export const user_login_validator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    .withMessage("Invalid Email"),
  check("password").notEmpty().withMessage("password is required"),
];
//#endregion

//#region user update profile req validator
export const user_update_validator = [
  check("email").custom((value, { req }) => {
    if (req.body.email) {
      throw new Error("Email update is not allowed");
    }
    return true;
  }),
  check("role").custom((value, { req }) => {
    if (req.body.role) {
      throw new Error("role update is not allowed");
    }
    return true;
  }),

  ...other_validators,
];
//#endregion
