const express = require('express');
const {getPost, getPosts, addPost, deletePost, updatePost} = require('../controllers/posts');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.delete('/:id', deletePost);
// router.update('/:id', updatePost);

module.exports = router;