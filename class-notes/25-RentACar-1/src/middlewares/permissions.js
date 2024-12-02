"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Middleware: permissions
const message = "Your account is not active. Please contact support.";
const CustomError = require("../errors/customError")

function getUserInfo(req){
  let user = req.user
  let isActive = req.user?.isActive
  let isAdmin = req.user?.isAdmin
  let isStaff = req.user?.isStaff


  return {user, isActive, isAdmin, isStaff}
}

module.exports = {

  isLogin: (req, res, next) => {

    const {user, isActive} = getUserInfo(req)

    if(!(user && isActive)){
      throw new CustomError("AuthorizationError: You must be an Admin or Staff to access this resource or ", 403);
    }

    if(!req.user?.isActive){
      throw new CustomError("Your account is not active. Please contact support.", 403);
    }

    next()
  },

  isStaffOrisAdmin: (req, res, next) => {
    if (!(req.user?.isAdmin || req.user?.isStaff)) {
      throw new CustomError("AuthorizationError: You must be an Admin or Staff to access this resource.", 403);
    }
    if (!req.user?.isActive) {
      throw new CustomError("Your account is not active. Please contact support.", 403);
    }
    next();
  },

  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("AuthorizationError: You must be an Admin to access this resource.");
    }
  },
};
