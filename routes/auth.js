const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.post(
  "/new",
  [
    check("name", "EL nombre es requerido").not().isEmpty(),
    check("email", "EL email es requerido").isEmail(),
    check("password", "EL password debe tener 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  createUser
);
router.post(
  "/",
  [
    check("email", "EL email es requerido").isEmail(),
    check("password", "EL password debe tener 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],

  loginUser
);
router.get("/renew", validarJWT, renewToken);

module.exports = router;
