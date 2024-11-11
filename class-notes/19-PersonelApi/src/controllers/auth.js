"use strict";

/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Personnel = require("../models/personnel");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const user = await Personnel.findOne({ email }); //email: req.body.email

      if (user) {
        if (user.password == passwordEncrypt(password)) {

            req.session.id = user._id
            req.session.password = user.password

            if( req.body.rememberMe == 'true'){
                req.sessionOption.maxAge = 1000 * 60 * 60 * 24 * 2
            }

          res.status(200).send({
            error: false,
            message: "Login success",
            user,
          });

        } else {
          res.errorStatusCode = 401;
          throw new Error("Wrong email or password");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong email or password");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter email and password");
    }
  },

  logout: async (req, res) => {
    req.session = null
    res.send({
        error:false,
        message: 'Logout is completed'
    })
  },
};
