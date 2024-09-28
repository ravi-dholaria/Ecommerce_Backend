//#region import statements
import fs from "fs";
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
