//#region Import statements
import error_handler from "./middlewares/error_handling_middleware.js";
import req_logger from "./middlewares/req_logger.js";
import connect_db from "./utils/db.js";
import express from "express";
//#endregion

const app = express();

connect_db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(req_logger);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.use(error_handler);

export default app;
