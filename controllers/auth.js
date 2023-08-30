const { response } = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const { generarJWT } = require("../helpers/jwt");

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
    // encript password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    const token = await generarJWT(user.id, user.name);

    res.status(201).json({ ok: true, uid: user.id, name: user.name, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact Admin",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User not valid",
      });
    }
    //confirmar contrasenas
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password not valid",
      });
    }
    const token = await generarJWT(user.id, user.name);

    res.json({ ok: true, uid: user.id, name: user.name, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact Admin",
    });
  }

  // res.json({ ok: true, msg: "registro", email, password });
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  // Generar JWT
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};
module.exports = { createUser, loginUser, renewToken };
