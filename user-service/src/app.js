//#region Import statements
import error_handler from "./middlewares/error_handling_middleware.js";
import req_logger from "./middlewares/req_logger.js";
import user_router from "./routes/user_routes.js";
import connect_db from "./utils/db.js";
import express from "express";
//#endregion

const app = express();

connect_db();

//#region Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(req_logger);
app.use("/api/user", user_router);
//#endregion

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found!" });
});
app.use(error_handler);

export default app;
