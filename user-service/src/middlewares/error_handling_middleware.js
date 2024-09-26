//#region import statements
import logger from "../utils/logger.js";
import multer from "multer";
//#endregion

//#region Error Handler
const error_handler = (err, req, res, next) => {
  const err_status = err.statusCode || 500;
  const err_msg = err.message || "Internal Server Error!";
  let res_obj = {};
  switch (true) {
    case err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE":
      res_obj = {
        status: 400,
        message: "File size is too large. Maximum allowed size is 10MB.",
      };
      res.status(400).json(res_obj);
      logger.error(JSON.stringify(res_obj));
      break;

    case err_status === "ECONNABORTED" || err_status == 408:
      res_obj = {
        success: false,
        status: err_status,
        message: "Request Timeout",
        stack: NODE_ENV === "development" ? err.stack : {},
      };
      res.status(408).json(res_obj);
      logger.error(JSON.stringify(res_obj) + "\n");
      break;

    default:
      res_obj = {
        success: false,
        status: err_status,
        message: err_msg,
        stack: NODE_ENV === "development" ? err.stack : {},
      };
      res.status(err_status).json(res_obj);
      logger.error(JSON.stringify(res_obj) + "\n");
      break;
  }
};
//#endregion

export default error_handler;
