//#region Import Statements
import exp from "constants";
import {
  get_access_token,
  login,
  register,
  remove_user,
  update_profile,
} from "../services/user_service.js";
import logger from "../utils/logger.js";
import { delete_file } from "../utils/utility.js";
//#endregion

//#region user register
export const user_register = async (req, res) => {
  const { username, email, password, address, role, phone_number } = req.body;
  const profile_path = req.file ? req.file.path : null;
  try {
    const new_user = await register({
      username,
      email,
      password,
      address,
      role,
      phone_number,
      profile_path,
    });
    const { password: _, ...user_without_password } = new_user.toObject();
    res.status(201).json(user_without_password);
  } catch (error) {
    res.status(500).json(error);
  }
};
//#endregion

//#region user login
export const user_login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, refresh_token } = await login(email, password);
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    });
    return res.status(200).json({ token });
  } catch (error) {
    res.status(401).json(error.message);
  }
};
//#endregion

//#region get profile
export const get_profile = (req, res) => {
  const { _id: _, password: __, ...user } = req.user.toObject();
  return res.status(200).json({ user });
};
//#endregion

//#region update profile
export const update_user_profile = async (req, res) => {
  try {
    const user_id = req.user._id;
    let new_user = req.body;
    let file_to_be_deleted = null;
    //if new profile_pic -> mark previous pic to be deleted
    if (req.file && req.file.path) {
      file_to_be_deleted = req.user.profile_path;
      new_user["profile_path"] = req.file.path;
      delete new_user.profile_pic;
    }
    new_user = await update_profile(user_id, new_user);
    const {
      _id: __,
      password: _,
      ...user_without_password
    } = new_user.toObject();
    res.status(200).json(user_without_password);
    if (file_to_be_deleted) delete_file(file_to_be_deleted);
  } catch (error) {
    delete_file(req.file.path);
    if (error.code == 11000)
      return res.status(400).json({
        message: `This ${
          Object.keys(error.keyPattern)[0]
        } is already occupied. Please try another.`,
      });
    res.status(400).json({ error: error.message });
  }
};
//#endregion

//#region delete account
export const delete_account = async (req, res) => {
  try {
    const data = await remove_user(req.user._id);
    if (data) return res.status(200).json("Account Deleted!");
    else return res.status(404).json({ message: "User not found." });
  } catch (error) {
    logger.error(
      JSON.stringify({
        success: false,
        message: error.message,
        statusCode: 500,
      })
    );
    return res.status(500).json({ message: error.message });
  }
};
//#endregion

//#region refresh_access_token
export const refresh_access_token = (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token)
      return res.status(401).json({ message: "Refresh token not provided." });
    const access_token = get_access_token(refresh_token);
    return res.status(200).json({ access_token });
  } catch (error) {
    error.statusCode = 401;
    logger.error(
      JSON.stringify({
        success: false,
        statusCode: error.statusCode,
        message: error.message,
      })
    );
    return res.status(401).json({ error });
  }
};
//#endregion
