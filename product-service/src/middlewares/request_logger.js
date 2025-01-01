//#region import statements
import morgan from "morgan";
import logger from "../utils/logger.js";
//#endregion

//#region stream
/**
 * stream is a stream object that can be used to write log messages to.
 * It is used to pass log messages to the logger.
 * The write method of the stream is called by morgan with the log message as an argument.
 * This method is expected to write the log message to the logger.
 */
const stream = {
  write: (message) => logger.info(message),
};
//#endregion

//#region morgan middleware
const morgan_middleware = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { stream }
);
//#endregion

export default morgan_middleware;
