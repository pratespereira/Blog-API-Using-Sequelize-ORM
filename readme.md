# Sequelize ORM

**This repository contains a simple blog API built with Node.js and the Sequelize ORM. The API allows for creating, reading, updating and deleting (CRUD) blog posts.**

## Getting Started

To run the application, you will need to run the node and db services with the command `docker-compose up -d`. These service will initialize a container named `blogs_api` and another named `blogs_api_db`.

Install the dependencies inside the `blogs_api` container with `npm install`.

## Running the Application

To start the application, you will need to run the following command: `npm start`

This will start the server and you will be able to access the application at [http://localhost:3000](http://localhost:3000/).

## Creating a Post


To create a new blog post, you will need to make a POST request to the endpoint `/post` with the post data in the request body. The data should include a `title` and `content` field.

## Reading a Post

To read a blog post, you will need to make a GET request to the endpoint `/post/:id`, where `:id` is the id of the post you want to read. Or `/post`, to get all posts.

## Updating a Post

To update a blog post, you will need to make a PUT request to the endpoint `/post/:id` with the updated data in the request body, where `:id` is the id of the post you want to update.

## Deleting a Post

To delete a blog post, you will need to make a DELETE request to the endpoint `/post/:id`, where `:id` is the id of the post you want to delete.


> **This API serves as a simple example of how to use the Sequelize ORM to build a CRUD API for a blog. This can be used as a starting point
> for building more complex applications.**
