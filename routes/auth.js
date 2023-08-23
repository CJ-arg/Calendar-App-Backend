const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const router = Router();

check;
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

router.get("/renew", renewToken);

module.exports = router;
