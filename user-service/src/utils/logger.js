//#region import statements
import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";
//#endregion

//#region Transport for Error
const error_transport = new winston.transports.DailyRotateFile({
  filename: path.resolve("./log/error", "error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  level: "error",
});
//#endregion

//#region Transport for General log
const general_transport = new winston.transports.DailyRotateFile({
  filename: path.resolve("./log", "general-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  level: "info",
});
//#endregion

//#region Transport for log to console
const console_transport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});
//#endregion

//#region Logger Instance
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [error_transport, general_transport],
});
//#endregion

//#region (development)? -> log to console
if (process.env.NODE_ENV == "development") {
  logger.add(console_transport);
}
//#endregion

export default logger;
