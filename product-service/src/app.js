//#region import statements
import express from "express";
import "dotenv/config";
import { error_handler } from "./middlewares/error_handlers.js";
import morgan_middleware from "./middlewares/request_logger.js";
import product_router from "./routes/product_route.js";
import categoryRouter from "./routes/category_route.js";
import connect_db from "./utils/db.js";
//#endregion

const app = express();

connect_db();

app.use(express.json());
app.use(morgan_middleware);

app.use("/api/v1/product", product_router);
app.use("/api/v1/categories", categoryRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res, next) => {
  res.status(404).json({ message: "404 Not Found!" });
});

app.use(error_handler);

export default app;
