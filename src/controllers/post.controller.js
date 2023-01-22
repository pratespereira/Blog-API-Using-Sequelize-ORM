require('dotenv/config');

const JWT = require('jsonwebtoken');
const PostService = require('../services/post.service');
const CategoryService = require('../services/category.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createPost = async (req, res) => {
  try {
    const { categoryIds } = req.body;
    const { id } = req.user.message.dataValues;

    const response = await Promise.all(categoryIds
      .map(async (categoryId) => CategoryService.getById(categoryId)));

      const categoryResponse = response.find((category) => category.type !== null);

    if (categoryResponse && categoryResponse.type) {
      return res.status(categoryResponse.type).json({ message: categoryResponse.message });
    }

    const result = await PostService.createPost(req.body, id);
    JWT.sign({ data: { userId: result.message.id } }, secret, jwtConfig);
    res.status(201).json(result.message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const result = await PostService.getAllPosts();
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await PostService.getById(id);
    if (!result) return res.status(404).json({ message: 'Post does not exist' });
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updatePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await PostService.updatePostById(req.body, postId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    PostService.deletePost(id);
    res.status(204).end();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await PostService.searchPost(q);
    res.status(200).json(result);    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getById,
  updatePostById,
  deletePost,
  searchPost,
};