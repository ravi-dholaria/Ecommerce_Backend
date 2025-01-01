//#region import statements
import mongoose from "mongoose";
//#endregion

const category_schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", category_schema);
