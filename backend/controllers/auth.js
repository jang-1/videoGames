const db = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
require('dotenv').config();

const register = (req, res) => {
  // Sprawdzenie istniejącego użytkownika

  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.name], (err, data) => {
    if(err) return res.json(err);
    if(data.length) return res.status(409).json("User already exists");

    // Zahasowanie hasła i utworzenie użytkownika

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    const q = "INSERT INTO users(`username`, `email`, `password`, `role`) VALUES (?)";
    const values = [
      req.body.name,
      req.body.email,
      hash,
      "user"
    ];
    db.query(q, [values], (err, data) => {
      if(err) res.json(err);
      return res.status(200).json("User has been created");
    });
  });
};

const login = (req, res) => {
  // Sprawdzenie istniejącego użytkownika

  const q = "SELECT * FROM users WHERE email = ? AND username = ?";

  db.query(q, [req.body.email, req.body.name], (err, data) => {
    if(err) return res.json(err);
    if(data.length === 0) return res.status(409).json("User not found!");

    //Sprwadzenie hasła

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

    if(!isPasswordCorrect) {
      return res.status(400).json("Wrong username, email or password")
    }

    const token = jwt.sign({id: data[0].id}, process.env.SECRET_KEY);
    
    const {password, ...other} = data[0]
    res.cookie("access_token", token, {
      httpOnly: true
    }).status(200).json(other)
  })
};

const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logout!")
};

module.exports = { register, login, logout };
