//#region import statements
import app from "./src/app.js";
import "dotenv/config";
import logger from "./src/utils/logger.js";
//#endregion

app.listen(process.env.PORT || 3001, () => {
  logger.info(`Server is running on: ${process.env.PORT || 3001}`);
  logger.info(
    `Server is running on: http://localhost:${process.env.PORT || 3001}`
  );
});
