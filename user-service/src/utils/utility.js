//#region import statements
import fs from "fs";
import logger from "./logger.js";
//#endregion

//#region Creating Folder Function
export const create_folder = (folder_path) => {
  try {
    if (!fs.existsSync(folder_path)) {
      fs.mkdirSync(folder_path);
    }
  } catch (err) {
    console.error(err);
  }
};
//#endregion

//#region  delete file function
export const delete_file = (file_path) => {
  fs.unlink(file_path, (err) => {
    if (err) logger.error(err);
  });
};
//#endregion
