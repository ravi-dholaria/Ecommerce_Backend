//#region Import Statements
import { register } from "../services/user_service.js";
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
