//#region import statement
import logger from "../utils/logger.js";
//#endregion

//#region Every Request logger
const req_logger = (req, res, next) => {
  const start_time = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start_time;
    const res_obj = {
      method: req.method,
      Url: req.url,
      message: res.res_obj || res.statusMessage || res.error,
      ip: req.ip,
      status: res.statusCode,
      duration: duration + "ms",
    };
    logger.info(JSON.stringify(res_obj));
  });
  res.on("timeout", () => {
    const timeoutError = new Error("Request timed out");
    timeoutError.status = 408;
    next(timeoutError);
  });
  next();
};
//#endregion

export default req_logger;
