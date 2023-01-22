require('dotenv/config');

const JWT = require('jsonwebtoken');
const CategoryService = require('../services/category.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    const { message } = await CategoryService.createCategory(req.body);
    JWT.sign({ data: { userId: message.id } }, secret, jwtConfig);
    res.status(201).json(message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const result = await CategoryService.getAllCategories();
    JWT.sign({ data: { userId: result.id } }, secret, jwtConfig);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};