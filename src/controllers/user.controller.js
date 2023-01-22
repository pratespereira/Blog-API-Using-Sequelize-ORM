require('dotenv/config');

const JWT = require('jsonwebtoken');
const UserService = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const { type, message } = await UserService.getByEmail(email);
    if (type) return res.status(type).json({ message });

    const token = JWT.sign({ data: { userId: message.id } }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { type, message } = await UserService.createUser(req.body);
    if (type) return res.status(type).json({ message });
    const token = JWT.sign({ data: { userId: message.id } }, secret, jwtConfig);
  
    return res.status(201).json({ token });    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { type, message } = await UserService.getAllUsers();
    if (type) return res.status(type).json({ message });
    JWT.sign({ data: { userId: message.id } }, secret, jwtConfig);

    res.status(200).json(message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await UserService.getById(id);
    if (type) return res.status(type).json({ message });

    JWT.sign({ data: { userId: message.dataValues.id } }, secret, jwtConfig);
    res.status(200).json(message.dataValues);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteMe = async (req, res) => {
  try {
    const { id } = req.user.message.dataValues;
    await UserService.deleteMe(id);
    res.status(204).end();    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  createUser,
  getAllUsers,
  getById,
  deleteMe,
};