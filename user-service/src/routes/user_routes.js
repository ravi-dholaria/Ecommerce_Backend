//#region import statements
import passport from "passport";
import { Router } from "express";
import "../middlewares/auth_middleware.js";
import {
  get_profile,
  refresh_access_token,
  update_user_profile,
  user_login,
  user_register,
  delete_account,
} from "../controllers/user_controller.js";
import {
  user_login_validator,
  user_register_validator,
  user_update_validator,
} from "../validations/user_req_validators.js";
import upload from "../middlewares/upload_middleware.js";
import { validate_result } from "../middlewares/error_handling_middleware.js";
//#endregion

const user_router = Router();

//#region routes

// /profile
user_router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  get_profile
);

// /register
user_router.post(
  "/register",
  upload.single("profile_pic"),
  user_register_validator,
  validate_result,
  user_register
);

// /login
user_router.post("/login", user_login_validator, validate_result, user_login);

// /update_profile
user_router.put(
  "/update_profile",
  passport.authenticate("jwt", { session: false }),
  upload.single("profile_pic"),
  user_update_validator,
  validate_result,
  update_user_profile
);

// /remove_user
user_router.delete(
  "/remove_user",
  passport.authenticate("jwt", { session: false }),
  delete_account
);

// /refresh_token
user_router.post("/refresh_token", refresh_access_token);

// user_router.post("/forgot_password");

//#endregion

export default user_router;
