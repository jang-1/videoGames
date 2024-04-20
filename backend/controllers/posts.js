const db = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const getPosts = (req, res) => {
    res.json("From controller")
};

const getPost = (req, res) => {
    res.json("From controller")
};

const addPost = (req, res) => {
    res.json("From controller")
};

const deletePost = (req, res) => {
    res.json("From controller")
};

const updatePost = (req, res) => {
    res.json("From controller")
};

module.exports = { getPosts, getPost, addPost, deletePost, updatePost};