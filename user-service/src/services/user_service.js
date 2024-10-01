//#region Import Statements
import user_model from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
//#endregion

//#region User Register Service
export const register = async (user_obj) => {
  try {
    const new_user = new user_model(user_obj);
    await new_user.save();

    return new_user;
  } catch (error) {
    throw error;
  }
};
//#endregion

//#region Get User by email
export const get_user_by_email = async (email) => {
  try {
    return await user_model.findOne({ email });
  } catch (error) {
    throw error;
  }
};
//#endregion

//#region Get user by id
export const get_user_by_id = async (id) => {
  try {
    return await user_model.findById(id);
  } catch (error) {
    throw error;
  }
};
//#endregion

//#region Generate Access Token
export const generate_token = (user) => {
  try {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });
  } catch (error) {
    throw error;
  }
};
//#endregion

//#region Generate Refresh Token
export const generate_refresh_token = (user) => {
  try {
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_KEY, {
      expiresIn: "7d",
    });
  } catch (error) {
    throw error;
  }
};
//#endregion

//#region user login service
export const login = async (email, password) => {
  try {
    const user = await get_user_by_email(email);
    if (!user) throw new Error("Invalid email or password!");

    const is_match = await bcrypt.compare(password, user.password);
    if (!is_match) throw new Error("Invalid email or password");

    const token = generate_token(user);
    const refresh_token = generate_refresh_token(user);

    return { token, refresh_token };
  } catch (error) {
    error.status = 401;
    throw error;
  }
};
//#endregion

//#region update profile service
export const update_profile = async (user_id, new_user_obj) => {
  try {
    //hash password
    if (new_user_obj.password) {
      const salt = await bcrypt.genSalt(10);
      new_user_obj.password = await bcrypt.hash(new_user_obj.password, salt);
    }

    const new_user = await user_model.findByIdAndUpdate(user_id, new_user_obj, {
      new: true,
    });

    if (!new_user) throw new Error("User Not Updated!");
    return new_user;
  } catch (error) {
    logger.error(error.errmsg);
    throw error;
  }
};
//#endregion

//#region remove user
export const remove_user = async (user_id) => {
  try {
    return await user_model.findByIdAndDelete(user_id);
  } catch (error) {
    throw error;
  }
};
//#endregion

//#region get access token via refresh token
export const get_access_token = (refresh_token) => {
  try {
    const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;
    const payload = jwt.verify(refresh_token, JWT_REFRESH_KEY);
    return generate_token({ _id: payload.id });
  } catch (error) {
    throw error;
  }
};
//#endregion
