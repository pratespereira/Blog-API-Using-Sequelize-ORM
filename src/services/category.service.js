const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create(name);
  return { type: null, message: newCategory };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getById = async (id) => {
  const category = await Category.findOne({
    where: { id },
  });
  if (!category) return { type: 400, message: '"categoryIds" not found' };
  return { type: null, message: category };
};

  module.exports = {
  createCategory,
  getAllCategories,
  getById,
};