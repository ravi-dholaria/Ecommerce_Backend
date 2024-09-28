//#region Import statements
import multer from "multer";
import { create_folder } from "../utils/utility.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
//#endregion

//#region Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder_path = path.resolve("./", "./uploads");
    create_folder(folder_path);
    cb(null, folder_path);
  },
  filename: (req, file, cb) => {
    const unique_filename = uuidv4() + path.extname(file.originalname);
    cb(null, unique_filename);
  },
});
//#endregion

//#region file upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB Max file size allowed.
  },
  fileFilter: (req, file, cb) => {
    const file_type = /jpeg|jpg|png/;
    const ext_name = file_type.test(
      path.extname(file.originalname).toLowerCase()
    );
    return ext_name
      ? cb(null, true)
      : cb(new Error("Only JPG,PNG, file are allowed!"));
  },
});
//#endregion

export default upload;
