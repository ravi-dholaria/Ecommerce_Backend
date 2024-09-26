//#region import statements
import mongoose from "mongoose";
import logger from "./logger.js";
//#endregion

//#region Connection to MongoDB
const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Mongodb Connected successfully");
  } catch (error) {
    logger.error("MongoDb connection error: %O", error);
  }
};
//#endregion

export default connect_db;
