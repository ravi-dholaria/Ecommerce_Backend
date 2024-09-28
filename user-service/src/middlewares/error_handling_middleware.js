//#region import statements
import { validationResult } from "express-validator";
import logger from "../utils/logger.js";
import multer from "multer";
import { error } from "console";
import fs from "fs";
//#endregion

//#region Error Handler
const error_handler = (err, req, res, next) => {
  const NODE_ENV = process.env.NODE_ENV;
  const err_status = err.status || 500;
  const err_msg = err.message || "Internal Server Error!";
  let res_obj = {};
  switch (true) {
    case err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE":
      res_obj = {
        status: 400,
        message: "File size is too large. Maximum allowed size is 10MB.",
      };
      logger.error(JSON.stringify(res_obj));
      res.status(400).json(res_obj);
      break;

    case err.code === "ECONNABORTED" || err_status == 408:
      res_obj = {
        success: false,
        status: err_status,
        message: "Request Timeout",
        stack: NODE_ENV === "development" ? err.stack : {},
      };
      logger.error(JSON.stringify(res_obj) + "\n");
      res.status(408).json(res_obj);
      break;

    default:
      res_obj = {
        success: false,
        status: err_status,
        message: err_msg,
        stack: NODE_ENV === "development" ? err.stack : {},
      };
      logger.error(JSON.stringify(res_obj) + "\n");
      res.status(err_status).json(res_obj);
      break;
  }
};
//#endregion

//#region Validation Error Handler
export const validate_result = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    err.status = 400;
    fs.unlink(req.file.path, (err) => {
      if (err) throw err;
    });
    next(err);
  }
  next();
};
//#endregion
export default error_handler;
