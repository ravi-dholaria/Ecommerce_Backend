//#region import statements
import mongoose from "mongoose";
//#endregion

//#region product Schema
const product_schema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      // required: true,
    },
    description: {
      type: String,
    },
    manufacture_details: {
      manufacture_name: {
        type: String,
        required: true,
      },
      model_number: {
        type: String,
      },
      release_date: {
        type: Date,
      },
    },
    shipping_details: {
      weight: {
        type: Number,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      depth: {
        type: Number,
      },
    },
    quantity: {
      type: Number,
      required: true,
    },
    pricing: {
      price: {
        type: Number,
        required: true,
      },
    },
    categories: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//#endregion

export default mongoose.model("products", product_schema);
