"use strict";

const User = require("../models/user");
const passwordEncrypt=require('../helpers/passwordEncrypt')

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email: email })
        if (user) {

            if(user.password == passwordEncrypt(password)){

                //session
                req.session._id = user._id
                req.session.password = user.password

                //cookie
                if(req.body.rememberMe == true){
                    req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 2
                }

                 res.status(202).send({
                     error: false,
                     msg:"Login success",
                     
            })
            }else{
                res.errorStatusCode = 401;
                throw new Error("Wrong password");
            }

           
        } else {
            res.errorStatusCode = 401;
            throw new Error("Wrong password or email");
        }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and Password Required");
    }
  },
  logout: async (req, res) => {
     req.session = null

     res.status(200).send({
        error:false,
        msg:"Logout success",
     })
  },
};
