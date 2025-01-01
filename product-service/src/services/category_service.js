//#region import statements
import Category from "../models/category_model.js";
//#endregion

const createCategory = async (data) => {
  const category = new Category(data);
  return category.save();
};

const getAllCategories = async () => {
  return Category.find({});
};

const getCategoryById = async (id) => {
  return Category.findById(id);
};

const updateCategory = async (id, data) => {
  return Category.findByIdAndUpdate(id, data, { new: true });
};

const deleteCategory = async (id) => {
  return Category.findByIdAndDelete(id);
};

export const getSubcategories = async (parent) => {
  return await Category.find({ parent });
};

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getSubcategories,
};
