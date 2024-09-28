//#region import statements
import { Router } from "express";
import { user_register_validator } from "../validations/user_registration_validator.js";
import { validate_result } from "../middlewares/error_handling_middleware.js";
import upload from "../middlewares/upload_middleware.js";
import { user_register } from "../controllers/user_controller.js";
import multer from "multer";
//#endregion

const user_router = Router();

//#region routes
// user_router.get("/:id");

user_router.post(
  "/register",
  upload.single("profile_pic"),
  user_register_validator,
  validate_result,
  user_register
);

// user_router.post("/login");

// user_router.post("/forgot_password");

// user_router.put("/update_profile");

// user_router.delete("/remove_user");
//#endregion

export default user_router;
