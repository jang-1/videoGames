const express = require('express');
const router = express.Router();
const {getPost, getPosts, addPost, deletePost, updatePost} = require('../controllers/posts');

// Definiowanie tras dotyczących użytkowników
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.delete('/:id', deletePost);
router.update('/:id', updatePost);

module.exports = router;