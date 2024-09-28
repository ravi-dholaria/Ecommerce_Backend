//#region Import Statements
import user_model from "../models/user_model.js";
import bcrypt from "bcryptjs";
//#endregion

//#region User Register Service
export const register = async (user_obj) => {
  const { password } = user_obj;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    user_obj["password"] = hashed_password;

    const new_user = new user_model(user_obj);
    await new_user.save();

    return new_user;
  } catch (error) {
    throw error;
  }
};
//#endregion
