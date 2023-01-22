const express = require('express');
const UserController = require('./controllers/user.controller');
const {
  validatePost,
  validateUpdatePost,
  checkPostAndAuth,
} = require('./middlewares/post.middleware');
const CategoryController = require('./controllers/category.controller');
const BlogPostController = require('./controllers/post.controller');
const {
  validateLogin,
  validateNewUser,
} = require('./middlewares/user.middleware');
const validateJWT = require('./authorization/JWT');

// ...

const app = express();

app.use(express.json());

// ...

app.post('/login', validateLogin, UserController.login);
app.post('/user', validateNewUser, UserController.createUser);
app.post('/categories', validateJWT, CategoryController.createCategory);
app.post('/post', validateJWT, validatePost, BlogPostController.createPost);
app.get('/user', validateJWT, UserController.getAllUsers);
app.get('/post', validateJWT, BlogPostController.getAllPosts);
app.get('/post/search', validateJWT, BlogPostController.searchPost);
app.get('/post/:id', validateJWT, BlogPostController.getById);
app.put(
  '/post/:id',
  validateJWT,
  validateUpdatePost,
  checkPostAndAuth,
  BlogPostController.updatePostById,
);
app.delete('/post/:id', validateJWT, checkPostAndAuth, BlogPostController.deletePost);
app.delete('/user/me', validateJWT, UserController.deleteMe);
app.get('/user/:id', validateJWT, UserController.getById);
app.get('/categories', validateJWT, CategoryController.getAllCategories);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;