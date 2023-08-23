const { response } = require("express");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exist",
      });
    }
    user = new User(req.body);
    await user.save();
    res.status(201).json({ ok: true, msg: "registro" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Contact Admin",
    });
  }
};

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  res.json({ ok: true, msg: "registro", email, password });
};

const renewToken = (req, res = response) => {
  res.json({ ok: true, msg: "renew" });
};

module.exports = { createUser, loginUser, renewToken };
