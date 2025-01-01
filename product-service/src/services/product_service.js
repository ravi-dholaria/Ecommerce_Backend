//#region import statements
import product_model from "../models/product_model.js";
import CustomError from "../utils/custom_error.js";
import logger from "../utils/logger.js";
//#endregion

export const all_product = async () => {
  return await product_model.find({});
};

export const find_product_by_id = async (id) => {
  const product = await product_model.findById(id);
  if (!product) throw new CustomError("Product not found", 404);
  return product;
};

export const insert_product = (product) => {
  const new_product = new product_model(product);
  if (!new_product) throw new CustomError("Insertion failed", 500);
  return new_product.save();
};

export const update_product_by_id = async (id, product) => {
  const updated_product = await product_model.findByIdAndUpdate(id, product);
  return updated_product;
};

export const delete_product_by_id = async (id) => {
  const deleted_product = await product_model.findByIdAndDelete(id);
  return deleted_product;
};

export const products_by_category = async (category) => {
  const products = await product_model.find({
    categories: new RegExp(`^${category}`),
  });
  if (!products)
    throw new CustomError("No products found in this category", 404);
  return products;
};

/**
 * Searches products based on provided criteria.
 *
 * @param {String} query - The search term for product titles (case-insensitive).
 * @param {Number} min_price - The minimum price to filter products.
 * @param {Number} max_price - The maximum price to filter products.
 * @param {String} category - The category to filter products by.
 *
 * @returns {Promise<Array>} - Returns an array of products matching the search criteria.
 * @throws {CustomError} - Throws an error if no products are found.
 */
export const search_products = async (
  query,
  min_price,
  max_price,
  category
) => {
  // Build a dynamic filter object
  const filter = {};

  // Search by name (title)
  if (query) {
    filter.title = { $regex: query, $options: "i" }; // Case-insensitive search
  }

  // Filter by price range
  if (min_price || max_price) {
    filter["pricing.price"] = {};
    if (min_price) filter["pricing.price"].$gte = Number(min_price);
    if (max_price) filter["pricing.price"].$lte = Number(max_price);
  }

  // Filter by category
  if (category) {
    filter.categories = new RegExp(`^${category}`);
  }
  console.log(filter);
  // Fetch the filtered products
  const products = await product_model.find(filter);
  if (!products || products.length === 0) {
    throw new CustomError("No products found matching the criteria", 404);
  }
  return products;
};
