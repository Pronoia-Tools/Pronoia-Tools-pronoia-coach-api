const express = require("express");
const login = express.Router();
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { check, validationResult } = require("express-validator");

login.get(
  "/",
  [
    check("email", "the field email  is required and must be an email")
      .exists()
      .isEmail(),
    check(
      "password",
      "the field password is required and has to have a min. of 4 char. and max. of 50 char."
    )
      .exists()
      .isLength({ min: 4, max: 50 }),
  ],
  async function (req, res, next) {
    let body = req.body;
    let { email, password } = body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        res.status(200).json({
          User: user.dataValues,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.status(errorCode).json({
          Error: errorMessage,
        });
      });
  }
);

module.exports = login;
