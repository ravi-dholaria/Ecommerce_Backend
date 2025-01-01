//#region import statements
import { error } from "console";
import product_model from "../models/product_model.js";
import {
  all_product,
  find_product_by_id,
  insert_product,
  update_product_by_id,
  delete_product_by_id,
  products_by_category,
  search_products,
} from "../services/product_service.js";
//#endregion

//only write empty functions that are mention in product route

export const get_all_products = async (req, res, next) => {
  try {
    const products = await all_product();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const get_product_by_id = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await find_product_by_id(id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Create a new product
 * @param {Object} req.body - Product details
 * @param {String} req.body.sku - Product SKU
 * @param {String} req.body.title - Product title
 * @param {Array} req.body.images - Product images
 * @param {String} req.body.description - Product description
 * @param {Object} req.body.manufacture_details - Product manufacture details
 * @param {String} req.body.manufacture_details.manufacture_name - Product manufacture name
 * @param {String} req.body.manufacture_details.model_number - Product model number
 * @param {Date} req.body.manufacture_details.release_date - Product release date
 * @param {Object} req.body.shipping_details - Product shipping details
 * @param {Number} req.body.shipping_details.weight - Product weight
 * @param {Number} req.body.shipping_details.height - Product height
 * @param {Number} req.body.shipping_details.width - Product width
 * @param {Number} req.body.shipping_details.depth - Product depth
 * @param {Number} req.body.quantity - Product quantity
 * @param {Object} req.body.price_details - Product price details
 * @param {Number} req.body.price_details.price - Product price
 * @param {Array} req.body.categories - Product categories
 * @returns {Promise<Object|Error>} - Returns the newly created product or an error
 */
export const create_product = async (req, res, next) => {
  try {
    const {
      sku,
      title,
      images,
      description,
      manufacture_details: { manufacture_name, model_number, release_date },
      shipping_details: { weight, height, width, depth },
      quantity,
      price_details: { price },
      categories,
    } = req.body;
    const new_product = await insert_product({
      sku,
      title,
      images,
      description,
      manufacture_details: { manufacture_name, model_number, release_date },
      shipping_details: { weight, height, width, depth },
      quantity,
      price_details: { price },
      categories,
    });
    return res.status(201).json(new_product);
  } catch (error) {
    next(error);
  }
};

export const update_product = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated_product = await update_product_by_id(id, req.body);
    return res.status(200).json(updated_product);
  } catch (error) {
    next(error);
  }
};

export const delete_product = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted_product = await delete_product_by_id(id);
    return res.status(200).json(deleted_product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const get_products_by_categories = async (req, res, next) => {
  try {
    const categories = req.params.categories;
    const products = await products_by_category(categories);
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const search_products_controller = async (req, res, next) => {
  try {
    const { query, min_price, max_price, category } = req.query;
    const products = await search_products(
      query,
      min_price,
      max_price,
      category
    );
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const product_controller = {
  get_all_products,
  get_product_by_id,
  create_product,
  update_product,
  delete_product,
  get_products_by_categories,
  search_products_controller,
};
