//#region import statements
import logger from "../../../user-service/src/utils/logger.js";
import CustomError from "../utils/custom_error.js";
//#endregion

//#region Error Handler
export const error_handler = (err, req, res, next) => {
  const NODE_ENV = process.env.NODE_ENV;
  const err_status = err.status || 500;
  const err_msg = err.message || "Internal Server Error";
  let res_obj = {
    success: false,
    status: err_status,
    message: err_msg,
    stack: NODE_ENV === "development" ? err.stack : {},
  };

  if (err.code === "ECONNABORTED" || err_status === 408) {
    res_obj = {
      success: false,
      status: err_status,
      message: "Request Timeout",
      stack: NODE_ENV === "development" ? err.stack : {},
    };
    logger.error(JSON.stringify(res_obj));
    return res.status(408).json(res_obj);
  } else {
    logger.error(JSON.stringify(res_obj));
  }
  return res.status(err_status).json(res_obj);
};
//#endregion
